const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

async function main() {
        await mongoose.connect('mongodb+srv://Shah:shah1214@cluster0.khnldpa.mongodb.net/?retryWrites=true&w=majority')
        console.log('Database connected')
}
main().catch(err => console.log(err));

const sample = (array) => {
        return array[Math.floor(Math.random() * array.length)]
};

const seedDB = async () => {
        await Campground.deleteMany({});
        for (let i = 0; i < 300; i++) {
                const random1000 = Math.floor(Math.random() * 1000);
                const price = Math.floor(Math.random() * 20 + 10);
                const camp = new Campground({
                        author: '6504731b51a702540b042c9e',
                        location: `${cities[random1000].city}, ${cities[random1000].state}`,
                        title: `${sample(descriptors)} ${sample(places)}`,
                        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus quis, suscipit aliquam distinctio, sed id voluptates deleniti beatae soluta necessitatibus rerum, atque ea aperiam? Maiores officia vitae minima id minus.`,
                        price,
                        geometry: {
                                type: 'Point',
                                coordinates: [
                                        cities[random1000].longitude,
                                        cities[random1000].latitude
                                ]
                        },
                        images: [
                                {
                                        url: 'https://res.cloudinary.com/dul4hxypd/image/upload/v1693041508/YelpCamp/u7xdlq16zqyv7pxounfy.jpg',
                                        filename: 'YelpCamp/u7xdlq16zqyv7pxounfy',
                                },
                                {
                                        url: 'https://res.cloudinary.com/dul4hxypd/image/upload/v1693041508/YelpCamp/ftviutgdwplxlmbjpppk.jpg',
                                        filename: 'YelpCamp/ftviutgdwplxlmbjpppk',
                                },
                                {
                                        url: 'https://res.cloudinary.com/dul4hxypd/image/upload/v1693041510/YelpCamp/zozudmb7gvuanfhahf8p.jpg',
                                        filename: 'YelpCamp/zozudmb7gvuanfhahf8p',
                                }
                        ]
                })
                await camp.save();
        }

}

seedDB().then(() => {
        mongoose.connection.close();
})
