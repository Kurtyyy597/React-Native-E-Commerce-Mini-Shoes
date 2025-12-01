👟 Shoes E-Commerce App (React Native)

A mini e-commerce application built using **React Native**.  
This app allows users to select shoes from a curated list, enter order details, calculate item total, toggle delivery, and generate a full purchase receipt with loading animation and date tracking.

This project demonstrates:
- UI/UX design
- State management using React Hooks
- Form validation
- ActivityIndicator loading simulation
- Dynamic computations
- Light/Dark mode theme toggling
- Receipt generator + buy again system

---

 ⭐ Features

 👟 **Shoe Catalog with Auto-Generated Price List**
- 13 branded shoes (Nike, Adidas, Vans, Under Armour, Gucci, etc.)
- Prices automatically generated from a JavaScript object
- Clean “Available Items” list displayed dynamically

 🌙 **Light / Dark Mode**
Switch instantly between:
- Light theme
- Dark theme  
Affects all text, backgrounds, and components.

 🛒 **Item Picker Dropdown**
Uses `@react-native-picker/picker` to let users:
- Select an item
- Automatically display item price
- Update total cost instantly

 📋 **Customer Input Form**
Fields:
- Name
- Address
- Item name
- Quantity  
With validation:
- Name (min length)
- Quantity must be numeric and > 0
- Required fields check

 🚚 **Pickup or Delivery**
- Toggle delivery mode
- Delivery updates confirmation message  
(“🚚 This item is for delivery” or “🏬 This item is for pickup”)

 ⏳ **Order Processing Simulation**
- Fake 5-second loading using `ActivityIndicator`
- Countdown timer  
- After processing → receipt appears automatically

🧾 **Receipt Output**
Shows:
- Customer name  
- Address  
- Item name  
- Price  
- Quantity  
- Date  
- Delivery/pickup message  
- Total price  
- “Buy Again” button (resets form)

 🔁 **Buy Again Feature**
- Clears the form
- Scrolls to top
- App ready for another purchase

---

 🗂️ Tech Stack

- **React Native**
- **Expo**
- **JavaScript / TypeScript (JS in this file)**
- **@react-native-picker/picker**
- **React Hooks (useState, useRef, useEffect)**
