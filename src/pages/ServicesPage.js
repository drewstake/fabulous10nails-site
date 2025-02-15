import React from 'react';
import '../styles/ServicesPage.css';

const services = [
  {
    category: "Acrylics",
    items: [
      { name: "Regular Full Set", price: "$40" },
      { name: "Regular Refill", price: "$40" },
      { name: "Pink & White Full Set", price: "$60" },
      { name: "Pink & White Back Fill", price: "$55" },
      { name: "Pink Fill", price: "$35" },
    ],
  },
  {
    category: "Nail Care",
    items: [
      { name: "Manicure", price: "$15" },
      { name: "Gel Manicure", price: "$30 and up" },
      { name: "Spa Pedicure", price: "$30 and up" },
      { name: "Deluxe Pedicure", price: "$45 and up" },
    ],
  },
  {
    category: "Powder Dip",
    items: [
      { name: "Dip Full Set", price: "$40 and up" },
    ],
  },
  {
    category: "Gel",
    items: [
      { name: "Full Set (Gel on top)", price: "$50 and up" },
      { name: "Fill", price: "$37 and up" },
    ],
  },
  {
    category: "Kid’s Menu",
    items: [
      { name: "Manicure", price: "$12" },
      { name: "Pedicure", price: "$20" },
      { name: "Mani & Pedi Combo", price: "$28" },
      { name: "Polish Change", price: "$8" },
    ],
  },
  {
    category: "Waxing",
    items: [
      { name: "Eyebrow", price: "$10" },
      { name: "Chin", price: "$10 and up" },
      { name: "Lip", price: "$6" },
      { name: "Under Arms", price: "$20" },
      { name: "Half Arms", price: "$20" },
      { name: "Full Arms", price: "$30" },
      { name: "Bikini", price: "$30" },
      { name: "Brazilian Bikini", price: "$50" },
    ],
  },
  {
    category: "Additional",
    items: [
      { name: "Polish Change", price: "$10" },
      { name: "French Polish Change", price: "$15" },
      { name: "Toe Polish Change", price: "$15" },
      { name: "Broken Nail Fix", price: "$3" },
      { name: "Nail Designs", price: "$3 and up" },
      { name: "Paraffin for Hands/Feet", price: "$10" },
      { name: "Cut Down", price: "$3" },
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services & Prices</h1>
      {services.map((serviceCategory, index) => (
        <div key={index} className="service-category">
          <h2>{serviceCategory.category}</h2>
          <ul>
            {serviceCategory.items.map((item, i) => (
              <li key={i}>
                <span className="service-name">{item.name}</span>
                <span className="service-price">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServicesPage;
