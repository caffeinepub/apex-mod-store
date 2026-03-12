import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

actor {
  type Product = {
    name : Text;
    description : Text;
    basePricePhysical : Nat;
    basePriceDigital : Nat;
  };

  type Module = {
    name : Text;
    description : Text;
    price : Nat;
  };

  type Order = {
    orderId : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    material : Text;
    color : Text;
    selectedModules : [Text];
    quantity : Nat;
    productType : Text; // "physical" or "digital"
    totalPrice : Nat;
    product : Product;
  };

  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;

  let product : Product = {
    name = "Apex-Mod Modular Desk Organizer";
    description = "A customizable, modular desk organizer with various modules.";
    basePricePhysical = 5000; // in INR
    basePriceDigital = 2000; // in INR
  };

  let availableModules : [Module] = [
    {
      name = "Pen Holder";
      description = "Module to hold pens and pencils";
      price = 200;
    },
    {
      name = "Tray";
      description = "Small tray for miscellaneous items";
      price = 150;
    },
    {
      name = "Phone Stand";
      description = "Module to place your phone";
      price = 250;
    },
    {
      name = "Drawer";
      description = "Small drawer for storage";
      price = 300;
    },
    {
      name = "Cable Organizer";
      description = "Module to manage cables";
      price = 180;
    },
    {
      name = "Sticky Note Holder";
      description = "Holds sticky notes";
      price = 120;
    },
  ];

  public query ({ caller }) func getProduct() : async Product {
    product;
  };

  public query ({ caller }) func getAvailableModules() : async [Module] {
    availableModules;
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    email : Text,
    phone : Text,
    address : Text,
    material : Text,
    color : Text,
    selectedModules : [Text],
    quantity : Nat,
    productType : Text,
    totalPrice : Nat,
  ) : async { orderId : Nat; totalPrice : Nat } {
    let orderId = nextOrderId;
    nextOrderId += 1;

    let order : Order = {
      orderId;
      customerName;
      email;
      phone;
      address;
      material;
      color;
      selectedModules;
      quantity;
      productType;
      totalPrice;
      product;
    };

    orders.add(orderId, order);

    {
      orderId;
      totalPrice;
    };
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async ?Order {
    orders.get(orderId);
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };
};
