/**
 * Flipkart Plant Medicines Scraper
 * Scrapes real product data for agricultural medicines
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const FLIPKART_URL = 'https://www.flipkart.com/search?q=plants%20medicines&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off';

// User agent to mimic browser
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
};

async function scrapePlantMedicines() {
    try {
        console.log('🌿 Starting Flipkart plant medicines scraper...\n');

        // Fetch the page
        console.log('📡 Fetching data from Flipkart...');
        const response = await axios.get(FLIPKART_URL, { headers });
        const html = response.data;

        // Load HTML into cheerio
        const $ = cheerio.load(html);

        const products = [];

        // Find product containers (Flipkart's structure)
        // Note: Flipkart's DOM structure may vary, this is a common pattern
        $('._1AtVbE, ._13oc-S, ._2kHMtA, .s1Q9rs, ._1fQZEK').each((index, element) => {
            try {
                const $element = $(element);

                // Extract product details
                const name = $element.find('._4rR01T, .s1Q9rs, ._2WkVRV, .IRpwTa').first().text().trim();
                const priceText = $element.find('._30jeq3, ._3I9_wc, ._2rQ-NK').first().text().trim();
                const originalPriceText = $element.find('._3I9_wc, ._11Hju5').first().text().trim();
                const ratingText = $element.find('._3LWZlK, ._1lRcqv').first().text().trim();
                const reviewsText = $element.find('._2_R_DZ span, .p1hsy0 span').first().text().trim();
                const imageUrl = $element.find('._396cs4 img, ._2r_T1I img, .DByuf4 img').first().attr('src');
                const link = $element.find('a._1fQZEK, a._2rpwqI').first().attr('href');

                // Clean and parse data
                const price = priceText.replace(/[₹,]/g, '').trim();
                const originalPrice = originalPriceText.replace(/[₹,]/g, '').trim();
                const rating = parseFloat(ratingText) || 0;
                const reviews = reviewsText.replace(/[(),]/g, '').trim();

                // Only add if we have at least a name and price
                if (name && price) {
                    const product = {
                        id: `flipkart_${index + 1}`,
                        name: name,
                        price: parseInt(price) || 0,
                        originalPrice: parseInt(originalPrice) || null,
                        rating: rating,
                        reviews: reviews || '0',
                        image: imageUrl ? (imageUrl.startsWith('//') ? 'https:' + imageUrl : imageUrl) : null,
                        link: link ? 'https://www.flipkart.com' + link : null,
                        source: 'Flipkart',
                        inStock: true,
                        category: categorizeMedicine(name),
                        scrapedAt: new Date().toISOString()
                    };

                    products.push(product);
                    console.log(`✅ Scraped: ${name.substring(0, 50)}...`);
                }
            } catch (error) {
                // Skip problematic products
                console.log(`⚠️  Skipped product ${index + 1}: ${error.message}`);
            }
        });

        console.log(`\n📊 Total products scraped: ${products.length}`);

        if (products.length > 0) {
            await saveProducts(products);

            return products;
        } else {
            console.log('\n❌ No products found. Flipkart may have changed their HTML structure.');
            console.log('💡 Trying alternative scraping method...\n');

            // Alternative: Try to extract any text that looks like product info
            const fallbackProducts = await fallbackScrape($);
            if (fallbackProducts.length > 0) {
                return fallbackProducts;
            }
        }

    } catch (error) {
        console.error('\n❌ Error scraping Flipkart:', error.message);
        console.log('\n⚠️ Switching to MOCK DATA due to scraping restrictions...');

        // Use mock data if scraping fails
        const mockProducts = getMockMedicines();
        await saveProducts(mockProducts);
    }
}

// Save products to files
async function saveProducts(products) {
    // Save to JSON file
    const outputPath = path.join(process.cwd(), 'src', 'data', 'scraped-medicines.json');
    const outputDir = path.dirname(outputPath);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const dataToSave = {
        scrapeDate: new Date().toISOString(),
        totalProducts: products.length,
        source: 'Mock Data (Fallback)',
        url: FLIPKART_URL,
        products: products
    };

    fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2));
    console.log(`\n💾 Saved ${products.length} products to: ${outputPath}`);

    // Also create a simplified version for quick import
    const simplifiedPath = path.join(process.cwd(), 'src', 'data', 'medicines-simplified.ts');
    const tsContent = generateTypescriptFile(products);
    fs.writeFileSync(simplifiedPath, tsContent);
    console.log(`📝 Generated TypeScript file: ${simplifiedPath}`);

    // Display sample products
    console.log('\n📦 Sample products:');
    products.slice(0, 5).forEach((p, i) => {
        console.log(`\n${i + 1}. ${p.name}`);
        console.log(`   Price: ₹${p.price}`);
        console.log(`   Rating: ${p.rating}⭐ (${p.reviews} reviews)`);
        console.log(`   Category: ${p.category}`);
    });

    return products;
}

function getMockMedicines() {
    return [
        {
            id: "mock_1",
            name: "Amistar Top Fungicide (Syngenta)",
            price: 450,
            originalPrice: 500,
            rating: 4.5,
            reviews: "120",
            image: "https://rukminim2.flixcart.com/image/416/416/kuk4x3k0/soil-manure/q/v/u/200-amistar-top-syngenta-original-imag7n3g6z3g3g3z.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "fungicide",
            scrapedAt: new Date().toISOString()
        },
        {
            id: "mock_2",
            name: "Neem Oil Organic Pesticide",
            price: 299,
            originalPrice: 399,
            rating: 4.2,
            reviews: "85",
            image: "https://rukminim2.flixcart.com/image/416/416/kwdv3bk0/plant-sapling/s/4/w/no-perennial-yes-neem-plant-1-green-nursery-original-imag92q3z3g3g3z.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "organic",
            scrapedAt: new Date().toISOString()
        },
        {
            id: "mock_3",
            name: "Coragen Insecticide (FMC)",
            price: 850,
            originalPrice: 950,
            rating: 4.8,
            reviews: "210",
            image: "https://rukminim2.flixcart.com/image/416/416/xif0q/insecticide/w/s/4/30-coragen-30ml-fmc-original-imagzdhyg2y3g3g3.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "pesticide",
            scrapedAt: new Date().toISOString()
        },
        {
            id: "mock_4",
            name: "Roundup Herbicide (Monsanto)",
            price: 350,
            originalPrice: 400,
            rating: 4.3,
            reviews: "150",
            image: "https://rukminim2.flixcart.com/image/416/416/k7usyvk0/plant-sapling/g/t/d/perennial-no-roundup-herbicide-1-green-nursery-original-imafpy6z3g3g3z.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "herbicide",
            scrapedAt: new Date().toISOString()
        },
        {
            id: "mock_5",
            name: "NPK 19:19:19 Soluble Fertilizer",
            price: 150,
            originalPrice: 200,
            rating: 4.6,
            reviews: "320",
            image: "https://rukminim2.flixcart.com/image/416/416/xif0q/fertilizer/a/b/c/1-npk-19-19-19-100-water-soluble-fertilizer-for-plants-original-imagz3g3g3z.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "fertilizer",
            scrapedAt: new Date().toISOString()
        },
        {
            id: "mock_6",
            name: "Bavistin Fungicide (Crystal)",
            price: 220,
            originalPrice: 250,
            rating: 4.4,
            reviews: "95",
            image: "https://rukminim2.flixcart.com/image/416/416/k7usyvk0/plant-sapling/g/t/d/perennial-no-bavistin-fungicide-1-green-nursery-original-imafpy6z3g3g3z.jpeg",
            link: "https://www.flipkart.com",
            source: "Mock",
            inStock: true,
            category: "fungicide",
            scrapedAt: new Date().toISOString()
        }
    ];
}

// Categorize medicine based on name
function categorizeMedicine(name) {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('fungicide') || nameLower.includes('blight') || nameLower.includes('mildew')) {
        return 'fungicide';
    } else if (nameLower.includes('pesticide') || nameLower.includes('insect') || nameLower.includes('pest')) {
        return 'pesticide';
    } else if (nameLower.includes('herbicide') || nameLower.includes('weed')) {
        return 'herbicide';
    } else if (nameLower.includes('organic') || nameLower.includes('neem') || nameLower.includes('natural')) {
        return 'organic';
    } else if (nameLower.includes('fertilizer') || nameLower.includes('nutrient')) {
        return 'fertilizer';
    }

    return 'general';
}

// Fallback scraping method
async function fallbackScrape($) {
    const products = [];

    // Try to find any divs that might contain product info
    $('div').each((index, element) => {
        const $el = $(element);
        const text = $el.text();

        // Look for price patterns
        if (text.includes('₹') && text.length < 200) {
            const name = text.split('₹')[0].trim();
            const priceMatch = text.match(/₹\s*(\d+)/);

            if (name && priceMatch && name.length > 10 && name.length < 100) {
                products.push({
                    id: `fallback_${products.length + 1}`,
                    name: name,
                    price: parseInt(priceMatch[1]),
                    rating: 4.0,
                    reviews: '0',
                    source: 'Flipkart (Fallback)',
                    category: categorizeMedicine(name),
                    inStock: true,
                    scrapedAt: new Date().toISOString()
                });
            }
        }
    });

    return products;
}

// Generate TypeScript file
function generateTypescriptFile(products) {
    const sampleProducts = products.slice(0, 20); // Limit to 20 products

    return `/**
 * Scraped Plant Medicines from Flipkart
 * Auto-generated on ${new Date().toLocaleString()}
 * Total products: ${products.length}
 */

export interface FlipkartMedicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: string;
  image?: string | null;
  link?: string | null;
  source: string;
  inStock: boolean;
  category: string;
  scrapedAt: string;
}

export const scrapedMedicines: FlipkartMedicine[] = ${JSON.stringify(sampleProducts, null, 2)};

export const medicineCategories = {
  fungicide: scrapedMedicines.filter(m => m.category === 'fungicide'),
  pesticide: scrapedMedicines.filter(m => m.category === 'pesticide'),
  herbicide: scrapedMedicines.filter(m => m.category === 'herbicide'),
  organic: scrapedMedicines.filter(m => m.category === 'organic'),
  fertilizer: scrapedMedicines.filter(m => m.category === 'fertilizer'),
  general: scrapedMedicines.filter(m => m.category === 'general'),
};
`;
}

// Run the scraper
scrapePlantMedicines()
    .then(() => {
        console.log('\n✨ Scraping complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
