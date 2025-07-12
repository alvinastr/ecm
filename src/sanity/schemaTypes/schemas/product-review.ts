import { defineField, defineType } from "sanity";

export const productReview = defineType({
    name: "productReview",
    title: "Product Review",
    type: "document",
    fields: [
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
        }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: "title",
            title: "Review Title",
            type: "string",
        }),
        defineField({
            name: "comment",
            title: "Review Comment",
            type: "text",
        }),
        defineField({
            name: "isVerified",
            title: "Verified Purchase",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "isApproved",
            title: "Approved",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "reviewDate",
            title: "Review Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            customerName: "customerName",
            rating: "rating",
            product: "product.title",
        },
        prepare({ title, customerName, rating, product }) {
            return {
                title: title || "Untitled Review",
                subtitle: `${customerName} - ${rating}⭐ - ${product}`,
            };
        },
    },
});
