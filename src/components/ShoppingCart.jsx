// import { Drawer, List, Typography, Button, Box } from "@mui/material";
// // import CartItem from "./CartItem";
// // import { CartItem as CartItemType } from "../types/types";

// interface ShoppingCartProps {
//   cartItems: CartItemType[];
//   open: boolean;
//   onClose: () => void;
//   onUpdateQuantity: (id: number, quantity: number) => void;
//   onRemoveItem: (id: number) => void;
//   onCheckout: () => void;
// }

// export default function ShoppingCart({
//   cartItems,
//   open,
//   onClose,
//   onUpdateQuantity,
//   onRemoveItem,
//   onCheckout,
// }: ShoppingCartProps) {
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 350, p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Shopping Cart
//         </Typography>
//         <List>
//           {cartItems.map((item) => (
//             <CartItem
//               key={item.id}
//               item={item}
//               onUpdateQuantity={onUpdateQuantity}
//               onRemoveItem={onRemoveItem}
//             />
//           ))}
//         </List>
//         <Typography variant="h6" align="right" sx={{ mt: 2 }}>
//           Total: ${total.toFixed(2)}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={onCheckout}
//           sx={{ mt: 2 }}
//         >
//           Checkout
//         </Button>
//       </Box>
//     </Drawer>
//   );
// }
