const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
        console.log('Database connected')
}
main().catch(err => console.log(err));

const sample = (array) => {
        return array[Math.floor(Math.random() * array.length)]
};

const seedDB = async () => {
        await Campground.deleteMany({});
        for (let i = 0; i < 50; i++) {
                const random1000 = Math.floor(Math.random() * 1000);
                const price = Math.floor(Math.random() * 20 + 10)
                const camp = new Campground({
                        location: `${cities[random1000].city}, ${cities[random1000].state}`,
                        title: `${sample(descriptors)} ${sample(places)}`,
                        image: "https://source.unsplash.com/collection/483251",
                        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus quis, suscipit aliquam distinctio, sed id voluptates deleniti beatae soluta necessitatibus rerum, atque ea aperiam? Maiores officia vitae minima id minus.`,
                        price
                })
                await camp.save();
        }

}

seedDB().then(() => {
        mongoose.connection.close();
})
