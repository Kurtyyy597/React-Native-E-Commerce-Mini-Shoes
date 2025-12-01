import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ActivityIndicatorTask6() {
  // PRICE LIST — VERY CLEAN
  const ITEM_PRICES: Record<string, number> = {
    "Nike Air Max ": 3000,
    "Adidas Ultraboost": 6000,
    "Under Armour HOVR": 4800,
    "Skechers D’Lites": 3500,
    "Gucci Ace": 15000,
    "Vans Old Skool": 3200,
    "New Balance 574": 4000,
    "Reebok Classic": 3700,
    "Converse All Star": 2800,
    "Jordan 1 Retro": 8000,
    "Asics Gel-Kayano": 5200,
    "Timberland Boots": 7000,
    "Balenciaga Triple S": 20000,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>("");
  const [saveItemName, setSavedItemName] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [saveQty, setSavedQty] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [saveAddress, setSavedAddress] = useState<string>("");

  const [availableItems, setAvailableItems] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("0");

  const scrollViewRef = useRef<ScrollView>(null);
  const [date, setDate] = useState<string>("");

  // AUTO GENERATE ITEM LIST
  useEffect(() => {
    let list = "                   Available Items:\n";
    Object.entries(ITEM_PRICES).forEach(([item, price]) => {
      list += `• ${item} - ${price}\n`;
    });
    setAvailableItems(list);
  }, []);

  // BUY ITEM
  const buyItem = () => {
    if (!name.trim() || !address.trim() || !itemName.trim() || !qty.trim()) {
      Alert.alert(`Please fill in all fields to buy an item!`);
      return;
    }

    if (isNaN(Number(qty))) {
      Alert.alert(`Quantity must be a number!`);
      return;
    }

    if (Number(qty) <= 0) {
      Alert.alert(`Quantity must be greater than zero!`);
      return;
    }

    if (name.length < 3) {
      Alert.alert(`Name is too short!`);
      return;
    }

    const itemPrice = ITEM_PRICES[itemName];
    if (!itemPrice) {
      Alert.alert("Item not available. Check the item list at the top.");
      return;
    }

    const total = itemPrice * Number(qty);
    setTotalPrice(total.toLocaleString());

    setLoading(true);
    setShowProfile(false);
    setSeconds(5);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowProfile(true);
          setLoading(false);
          setSavedName(name);
          setSavedAddress(address);
          setSavedQty(qty);
          setSavedItemName(itemName);
          setDate(new Date().toLocaleDateString());
          setName("");
          setAddress("");
          setQty("");
          setItemName("");
          setDelivery(false);

          if (delivery) setMessage('🚚 This item is for delivery. Thank you for purchasing from our shop!');
          else setMessage('🏬 This item is for pickup. Thank you for purchasing from our shop!');

          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  // CLEAR INPUT FORM
  const clearInputForm = () => {
    setAddress("");
    setDelivery(false);
    setItemName("");
    setQty("");
    setName("");
    setShowProfile(false);
    setSeconds(0);
    setSavedAddress("");
    setSavedItemName("");
    setSavedQty("");
    setSavedName("");
    setTotalPrice("0");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: toggleDarkMode ? '#666464ff' : '#87f706ff' }]}
        ref={scrollViewRef}
        contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.darkModeContainer}>
          <Text style={[styles.darkModeText, { color: toggleDarkMode ? '#fcfcfcff' : '#030600ff' }]}>
            {toggleDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch value={toggleDarkMode} onValueChange={setToggleDarkMode} />
        </View>
        
        <Text style={[styles.titleShop, {color: toggleDarkMode ? '#fff' : '#444'}]}>
          Welcome to online shoe shop!
        </Text>
        
        <Text style={[styles.label, {color: toggleDarkMode ? '#fff' : '#444'}]}>
          Select Item:
        </Text>

        <View style={[styles.pickerContainer, {backgroundColor: toggleDarkMode ? '#444' : '#87f706ff'}]}>
          <Picker
            selectedValue={itemName}
            onValueChange={(value) => {
              setItemName(value);
              const p = ITEM_PRICES[value];
              setTotalPrice(p ? p.toLocaleString() : "0");
            }}
            style={[styles.picker, {color: toggleDarkMode ? '#fff' : '#444'}]}
          >
            <Picker.Item label="Choose item..." value="" />
            {Object.entries(ITEM_PRICES).map(([item, price]) => (
              <Picker.Item key={item} label={`${item} - ${price}`} value={item} />
            ))}
          </Picker>
        </View>

        {/* Selected Item + Price */}
        <Text style={[styles.selectedText, {color: toggleDarkMode ? '#fff' : '#130101ff'}]}>
          Selected Item: {itemName || "None"}
          {itemName ? ` • Price: ₱${ITEM_PRICES[itemName].toLocaleString()}` : ""}
        </Text>

        <Text
          style={[
            styles.itemList,
            { color: toggleDarkMode ? '#f4fdfdff' : '#444', backgroundColor: toggleDarkMode ? '#444' : '#87f706ff' },
          ]}
        >
          {availableItems}
        </Text>

        {/* INPUT FORM */}
        <View
          style={[
            styles.inputForm,
            { backgroundColor: toggleDarkMode ? '#444' : '#87f706ff' },
          ]}
        >
          <TextInput
            style={[styles.input, {color: toggleDarkMode ? '#fff' : '#444'}]}
            placeholder="Type your name"
            placeholderTextColor={toggleDarkMode ? '#fff' : '#444'}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, {color: toggleDarkMode ? '#fff' : '#444'}]}
            placeholder="Type your address"
            placeholderTextColor={toggleDarkMode ? '#fff' : '#444'}
            value={address}
            onChangeText={setAddress}
          />

          <TextInput
            style={[styles.input, {color: toggleDarkMode ? '#fff' : '#444'}]}
            placeholder="Item name"
            placeholderTextColor={toggleDarkMode ? '#fff' : '#444'}
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={[styles.input, {color: toggleDarkMode ? '#fff' : '#444'}]}
            placeholder="Quantity"
            placeholderTextColor={toggleDarkMode ? '#fff' : '#000'}
            value={qty}
            onChangeText={setQty}
          />

          <View style={styles.containerSwitchDelivery}>
            <Text style={[styles.textSwitchDelivery, { color: delivery ? '#124feaff' : '#540deeff' }]}>
              {delivery ? 'DELIVERY' : 'PICKUP'}
            </Text>
            <Switch value={delivery} onValueChange={setDelivery} />
          </View>

          <View style={styles.allButton}>
            <Pressable
              onPress={buyItem}
              style={({ pressed }) => [styles.buttonBuy, { backgroundColor: pressed ? '#87f706ff' : '#fff' }]}
            >
              <Text style={styles.textBuy}> Buy Item </Text>
            </Pressable>

            <Pressable
              onPress={clearInputForm}
              style={({ pressed }) => [styles.buttonClear, { backgroundColor: pressed ? '#87f706ff' : '#fff' }]}
            >
              <Text style={styles.textClear}> Clear All </Text>
            </Pressable>
          </View>
        </View>

        {/* LOADING */}
        {loading && (
          <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={'#5cea04ff'}/>
            <Text style={styles.textLoading}> Processing your order... {seconds}s</Text>
          </View>
        )}

        {/* OUTPUT */}
        {!loading && showProfile && (
          <View style={[styles.profileOutput]}>
            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              Hello {saveName}, here is your receipt:
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              👤 Customer Name: {saveName}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              🏠 Address: {saveAddress}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              👟 Item Name: {saveItemName}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              💰 Price per unit: ₱{ITEM_PRICES[saveItemName].toLocaleString()}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              📦 Quantity: {saveQty}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              Date: {date}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              {message}
            </Text>

            <Text style={[styles.outputText, {color: toggleDarkMode ? '#faf4f4ff' : '#444'}]}>
              🧾 Total Price: ₱{totalPrice}
            </Text>

            <Pressable
              onPress={() => {
                clearInputForm();
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
              }}
              style={({pressed}) => [
                styles.buttonBuyAgain,
                {backgroundColor: pressed ? '#1c06ddff' : '#fff' }
              ]}
            >
              <Text style={styles.textBuyAgain}> Buy Again </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


/* ========= STYLES (UNCHANGED) ========= */

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkModeContainer: { marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  darkModeText: { fontSize: 16, fontWeight: 'bold' },
  titleShop: { textAlign: 'center', fontSize: 30, fontWeight: 'bold' },
  label: { fontSize: 16, textAlign: 'center', borderRadius: 20 },
  pickerContainer: { marginTop: 10, borderWidth: 1, borderRadius: 10, width: 240, overflow: 'hidden', marginBottom: 10 },
  picker: { height: 50, width: '100%', color: '#000' },
  selectedText: { fontSize: 20, textAlign: 'center', fontWeight: 'bold' },
  itemList: { borderWidth: 3, borderRadius: 20, marginTop: 10, width: 250 },
  inputForm: { marginTop: 10, borderWidth: 2, borderRadius: 20, width: 300, height: 350, alignItems: 'center' },
  input: { marginTop: 10, width: '85%', borderRadius: 20, fontSize: 16, alignItems: 'center', fontWeight: 'bold', borderWidth: 1 },
  containerSwitchDelivery: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  textSwitchDelivery: { fontSize: 16, fontWeight: 'bold', right: 7 },
  allButton: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  buttonBuy: { right: 40, width: 100, height: 40, borderWidth: 1, borderRadius: 20, alignItems: 'center' },
  textBuy: { textAlign: 'center', marginTop: 5, fontSize: 16 },
  buttonClear: { left: 40, width: 100, height: 40, borderWidth: 1, borderRadius: 20, alignItems: 'center' },
  textClear: { textAlign: 'center', marginTop: 5, fontSize: 16 },
  loadingView: { flex: 1, alignItems: 'center', marginTop: 20 },
  textLoading: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  profileOutput: { flex: 1, alignItems: 'center', marginTop: 20, borderWidth: 1, borderRadius: 20, width: 300, height: 350 },
  outputText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  buttonBuyAgain: { marginTop: 10, width: 100, height: 40, borderWidth: 1, borderRadius: 20, alignItems: 'center' },
  textBuyAgain: { textAlign: 'center', marginTop: 5, fontSize: 16 },
});
