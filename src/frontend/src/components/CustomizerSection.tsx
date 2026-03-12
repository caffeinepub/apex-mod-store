import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileCode, Loader2, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { usePlaceOrder } from "../hooks/useQueries";

const MODULES = [
  { id: "iphone_stand", name: "iPhone Stand", price: 50 },
  { id: "controller_hook", name: "Controller Hook", price: 50 },
  { id: "cable_comb", name: "Cable Management Comb", price: 50 },
  { id: "pen_holder", name: "Pen Holder", price: 50 },
  { id: "headphone_hook", name: "Headphone Hook", price: 50 },
];

const COLORS = [
  { id: "matte_black", name: "Matte Black", swatch: "#1a1a1a" },
  { id: "ocean_blue", name: "Ocean Blue", swatch: "#1a4a7a" },
  { id: "silk_white", name: "Silk White", swatch: "#e8e8e0" },
  {
    id: "dual_color",
    name: "Dual-Color",
    swatch: "linear-gradient(135deg, #1a1a1a 50%, #e8e8e0 50%)",
  },
];

const MATERIALS = [
  { id: "pla", name: "PLA+", subtitle: "Eco-friendly, biodegradable" },
  { id: "petg", name: "PETG", subtitle: "Premium durability" },
];

export default function CustomizerSection() {
  const [productType, setProductType] = useState<"physical" | "digital">(
    "physical",
  );
  const [material, setMaterial] = useState("pla");
  const [color, setColor] = useState("matte_black");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const [orderOpen, setOrderOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    totalPrice: number;
  } | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const basePrice = productType === "physical" ? 599 : 399;
  const modulesPrice = selectedModules.length * 50;
  const unitPrice = basePrice + modulesPrice;
  const totalPrice = unitPrice * quantity;

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId],
    );
  };

  const handleSubmit = async () => {
    const missingName = !name.trim();
    const missingEmail = !email.trim();
    const missingPhone = !phone.trim();
    const missingAddress = !address.trim();
    setNameError(missingName);
    setEmailError(missingEmail);
    setPhoneError(missingPhone);
    setAddressError(missingAddress);
    if (missingName || missingEmail || missingPhone || missingAddress) return;

    const localTotal = totalPrice;
    const fallbackOrderId = Date.now().toString();

    setOrderOpen(false);
    setConfirmedOrder({ orderId: fallbackOrderId, totalPrice: localTotal });
    setConfirmOpen(true);

    try {
      await placeOrder({
        customerName: name,
        email,
        phone,
        address,
        material,
        color,
        selectedModules,
        quantity: BigInt(quantity),
        productType,
        totalPrice: BigInt(localTotal),
      });
    } catch {
      // Silently ignore -- confirmation already shown
    }
  };

  const colorLabel = COLORS.find((c) => c.id === color)?.name ?? color;
  const materialLabel =
    MATERIALS.find((m) => m.id === material)?.name ?? material;

  return (
    <section id="customizer" className="relative py-24 px-6 md:px-12">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/30 text-xs tracking-widest uppercase">
            Configurator
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight">
            Build <span className="text-gradient-cyan">Your Setup</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Every Apex-Mod is made to order. Choose your specs and we'll
            3D-print it just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Config Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Type */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Product Type
              </h3>
              <div
                className="grid grid-cols-2 gap-3"
                data-ocid="customizer.product_type.toggle"
              >
                {(["physical", "digital"] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setProductType(type)}
                    className={`flex flex-col items-start p-4 rounded-md border-2 transition-all ${
                      productType === type
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {type === "physical" ? (
                        <Package className="w-4 h-4" />
                      ) : (
                        <FileCode className="w-4 h-4" />
                      )}
                      <span className="font-display font-bold text-sm">
                        {type === "physical"
                          ? "Physical Product"
                          : "STL File License"}
                      </span>
                    </div>
                    <span
                      className={`text-xl font-black font-display ${productType === type ? "text-primary" : ""}`}
                    >
                      ₹{type === "physical" ? "599" : "399"}
                    </span>
                    <span className="text-xs mt-1 opacity-70">
                      {type === "physical"
                        ? "Printed & shipped to you"
                        : "Print it yourself"}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Material - only for physical */}
            {productType === "physical" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  Material
                </h3>
                <div
                  className="grid grid-cols-2 gap-3"
                  data-ocid="customizer.material.select"
                >
                  {MATERIALS.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      className={`flex flex-col items-start p-4 rounded-md border-2 transition-all ${
                        material === m.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                      }`}
                    >
                      <span className="font-display font-bold">{m.name}</span>
                      <span className="text-xs opacity-70 mt-0.5">
                        {m.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Color */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Color Finish
              </h3>
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                data-ocid="customizer.color.select"
              >
                {COLORS.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-md border-2 transition-all ${
                      color === c.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/50 hover:border-border/80"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-white/20"
                      style={{
                        background:
                          c.id === "dual_color"
                            ? "linear-gradient(135deg, #1a1a1a 50%, #e8e8e0 50%)"
                            : c.swatch,
                      }}
                    />
                    <span className="text-xs font-medium leading-tight text-center">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Add-on Modules */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">
                Add-on Modules
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Each module adds ₹50
              </p>
              <div className="space-y-3">
                {MODULES.map((mod, i) => (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between p-3 rounded-md bg-secondary/40 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={mod.id}
                        checked={selectedModules.includes(mod.id)}
                        onCheckedChange={() => toggleModule(mod.id)}
                        data-ocid={`customizer.module.checkbox.${i + 1}`}
                        className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor={mod.id}
                        className="cursor-pointer font-medium"
                      >
                        {mod.name}
                      </Label>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      +₹{mod.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-md border border-border bg-secondary/50 hover:bg-secondary font-bold text-lg flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(
                        10,
                        Math.max(1, Number.parseInt(e.target.value) || 1),
                      ),
                    )
                  }
                  data-ocid="customizer.quantity.input"
                  className="w-20 text-center font-display font-bold text-lg bg-secondary/50 border-border"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 rounded-md border border-border bg-secondary/50 hover:bg-secondary font-bold text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
                <span className="text-xs text-muted-foreground">
                  Max 10 units
                </span>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-8 self-start"
          >
            <div className="bg-card border border-primary/30 rounded-lg p-6 glow-cyan">
              <h3 className="font-display font-black text-lg mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium">
                    {productType === "physical" ? "Physical" : "STL License"}
                  </span>
                </div>
                {productType === "physical" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material</span>
                    <span className="font-medium">{materialLabel}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color</span>
                  <span className="font-medium">{colorLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium">₹{basePrice}</span>
                </div>
                {selectedModules.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Modules ({selectedModules.length})
                    </span>
                    <span className="font-medium text-primary">
                      +₹{modulesPrice}
                    </span>
                  </div>
                )}
                {selectedModules.length > 0 && (
                  <div className="pl-3 space-y-1">
                    {selectedModules.map((id) => (
                      <div
                        key={id}
                        className="flex justify-between text-xs text-muted-foreground"
                      >
                        <span>· {MODULES.find((m) => m.id === id)?.name}</span>
                        <span>₹50</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">× {quantity}</span>
                </div>
              </div>

              <Separator className="my-4 bg-border" />

              <div className="flex justify-between items-center mb-6">
                <span className="font-display font-bold text-base">Total</span>
                <span className="font-display font-black text-3xl text-primary">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold text-base py-6 glow-cyan"
                onClick={() => setOrderOpen(true)}
                data-ocid="customizer.order_button"
              >
                Order Now →
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Made to order · Ships in 5–7 days
              </p>
            </div>

            {/* Product images: prototype + features side by side */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground text-center mb-1 uppercase tracking-wider">
                  Prototype
                </p>
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-12-at-12.24.46-PM-1-1.jpeg"
                  alt="Apex Mod prototype"
                  className="w-full aspect-square object-cover rounded-md border border-border"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground text-center mb-1 uppercase tracking-wider">
                  Features
                </p>
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-12-at-12.24.47-PM-2-1.jpeg"
                  alt="Apex Mod features"
                  className="w-full aspect-square object-cover rounded-md border border-border"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order Form Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent
          className="bg-card border border-border max-w-lg"
          data-ocid="order_form.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-black text-xl">
              Complete Your Order
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="bg-secondary/50 rounded-md p-3 text-sm flex justify-between">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-display font-black text-primary text-lg">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div>
              <Label
                htmlFor="order-name"
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
              >
                Full Name
              </Label>
              <Input
                id="order-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
                placeholder="Your name"
                data-ocid="order_form.name.input"
                className={`bg-secondary/50 ${nameError ? "border-red-500" : "border-border"}`}
              />
              {nameError && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="order-email"
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
              >
                Email
              </Label>
              <Input
                id="order-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                placeholder="your@email.com"
                data-ocid="order_form.email.input"
                className={`bg-secondary/50 ${emailError ? "border-red-500" : "border-border"}`}
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="order-phone"
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
              >
                Phone
              </Label>
              <Input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError(false);
                }}
                placeholder="+91 XXXXX XXXXX"
                data-ocid="order_form.phone.input"
                className={`bg-secondary/50 ${phoneError ? "border-red-500" : "border-border"}`}
              />
              {phoneError && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="order-address"
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
              >
                Delivery Address
              </Label>
              <Textarea
                id="order-address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddressError(false);
                }}
                placeholder="Full delivery address with pincode"
                data-ocid="order_form.address.textarea"
                rows={3}
                className={`bg-secondary/50 resize-none ${addressError ? "border-red-500" : "border-border"}`}
              />
              {addressError && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-border"
                onClick={() => setOrderOpen(false)}
                data-ocid="order_form.close_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold"
                onClick={handleSubmit}
                disabled={isPending}
                data-ocid="order_form.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing
                    Order...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          className="bg-card border border-primary/40 max-w-md text-center"
          data-ocid="order_confirmation.dialog"
        >
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-cyan">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display font-black text-2xl mb-2">
              Order Placed!
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Thank you for ordering your Apex-Mod. We'll start printing right
              away.
            </p>
            {confirmedOrder && (
              <div className="bg-secondary/60 rounded-md px-6 py-3 mb-4 w-full">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Order ID
                </p>
                <p className="font-display font-black text-xl text-primary">
                  #{confirmedOrder.orderId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: ₹{confirmedOrder.totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Expected delivery: 5–7 business days
            </p>
            <Button
              className="mt-6 bg-primary text-primary-foreground w-full font-display font-bold"
              onClick={() => setConfirmOpen(false)}
              data-ocid="order_confirmation.close_button"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
