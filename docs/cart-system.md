# Cart System

This document describes the shopping cart implementation in the e-commerce application.

## Overview

The cart system allows users to add products to a shopping cart, adjust quantities, and prepare for checkout. The cart data is stored in the PostgreSQL database for authenticated users.

## Database Schema

The cart system uses the following database models:

```prisma
model Cart {
  id      String   @id
  userId  Int?     @unique
  user    User?    @relation(references: [id], fields: [userId], onDelete: Cascade)
  items   CartLineItem[]
}

model CartLineItem {
  id              String   @id
  sanityProductId String
  quantity        Int
  title           String
  price           Float
  image           String
  cartId          String
  cart            Cart     @relation(references: [id], fields: [cartId], onDelete: Cascade)
}
```

## Key Features

1. **Cart Creation**: A cart is created automatically when a user adds their first product
2. **Line Items**: Each product in the cart is represented as a CartLineItem
3. **User Association**: Carts are associated with users when they're authenticated
4. **Persistence**: Cart data is saved between sessions for logged-in users

## Cart Operations

The cart system supports the following operations:

- **Add to Cart**: Add a product with a specified quantity
- **Update Quantity**: Modify the quantity of an existing cart item
- **Remove Item**: Delete a specific item from the cart
- **Clear Cart**: Remove all items from the cart

## Implementation

The cart system is implemented using Next.js Server Actions, which handle database operations securely on the server.

### Cart Component

The `Cart` component is rendered in the root layout, making it accessible throughout the application. It displays:

- Cart items with images, titles, and prices
- Item quantities with adjustment controls
- Subtotal and total calculations
- Checkout button

### Server Actions

Cart operations are implemented as server actions to securely interact with the database:

```typescript
// Example structure of cart actions
export async function addToCart(productId: string, quantity: number) {
  // Get current user
  // Find or create cart
  // Add item to cart
  // Return updated cart
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  // Update quantity of existing item
  // Remove item if quantity is zero
  // Return updated cart
}

export async function removeFromCart(itemId: string) {
  // Remove item from cart
  // Return updated cart
}

export async function clearCart() {
  // Remove all items from cart
  // Return empty cart
}
```

## Cart State Management

For optimal user experience, the cart implements a combination of server and client state:

1. Server-side state is the source of truth stored in the database
2. Client-side state provides immediate feedback during interactions
3. Server actions update the database and reconcile client state

## Integration with Products

The cart system integrates with Sanity product data by:

1. Storing the Sanity product ID as a reference
2. Caching essential product data (title, price, image) for performance
3. Displaying the most current product information from Sanity

## Security Considerations

- Cart operations require CSRF protection (implemented in middleware)
- User authentication is verified for all cart operations
- Price calculations are always performed on the server to prevent manipulation
