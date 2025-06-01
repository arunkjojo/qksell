import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, writeFileSync } from "fs";

const baseUrl = "https://dev.qksell.in"; // Replace with your actual site URL

const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/newpost', changefreq: 'weekly', priority: 0.9 },
    { url: '/search', changefreq: 'weekly', priority: 0.7 },
    { url: '/signin', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/state', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/district', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/category', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/subCategory', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/postDetails', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/user', changefreq: 'monthly', priority: 0.6 },
    { url: '/newpost/otpValidation', changefreq: 'monthly', priority: 0.6 },
    // Add more pages as needed
];

(async () => {
    const sitemap = new SitemapStream({ hostname: baseUrl });
    const outputPath = './dist/sitemap.xml';
    const writeStream = createWriteStream(outputPath);

    sitemap.pipe(writeStream);

    for (const page of pages) {
        sitemap.write(page);
    }

    sitemap.end();

    await streamToPromise(sitemap);
    console.log(`✅ Sitemap written to ${outputPath}`);
    

    
    const outputPath2 = "./dist/robots.txt";
    const content = `Sitemap: ${baseUrl}/sitemap.xml`; // `User-agent: *\nDisallow:\nSitemap: ${baseUrl}/sitemap.xml`;

    // Write the file
    writeFileSync(outputPath2, content, "utf8");

    console.log(`✅ Robots written to ${outputPath2}`);

})();