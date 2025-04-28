# Sanity CMS Integration

This project uses Sanity.io as a headless CMS for managing product content.

## Overview

Sanity provides a flexible content model for our e-commerce products, categories, and promotional campaigns. The integration includes a Sanity Studio that's embedded within the Next.js application for content management.

## Content Schema

### Product Schema

```typescript
// Product schema
export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "productCategory" }],
        }),
    ]
})
```

### Product Category Schema

```typescript
// Product Category schema
export const productCategory = defineType({
    name: "productCategory",
    title: "Product Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
        }),
    ]
})
```

### Promotion Schemas

The system includes schemas for promotional campaigns and codes:

- `promotionCampaign`: For managing marketing campaigns
- `promotionCode`: For discount codes and special offers

## Sanity Studio

Sanity Studio is embedded in the Next.js application at the `/studio` route. This provides a user-friendly interface for content editors to manage products, categories, and promotions.

The studio is configured in:
- `sanity.config.ts`: Main configuration file
- `src/app/studio/[[...tool]]/page.tsx`: Next.js route for the studio

## Live Content API

The project utilizes Sanity's Live Content API to keep content automatically updated in real-time without requiring page refreshes.

```typescript
export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
```

The `SanityLive` component is rendered in the root layout, enabling real-time updates throughout the application.

## Environment Variables

The Sanity integration requires the following environment variables:

