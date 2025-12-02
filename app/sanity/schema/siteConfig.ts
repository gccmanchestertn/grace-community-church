import { defineField, defineType } from "sanity";
import { Cog } from "lucide-react";

export const siteConfig = defineType({
  name: "siteConfig",
  type: "document",
  title: "Site Configuration",
  icon: Cog,
  fieldsets: [{ name: "footer", title: "Footer" }],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Site Title",
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "url",
      description: "The URL of your website, used to create canonical url",
    }),
    defineField({
      title: "Phone Number",
      name: "phoneNumber",
      type: "string",
      description: "The phone number of your church",
    }),
    defineField({
      title: "Email",
      name: "email",
      type: "string",
      description: "The email address of your church",
    }),
    defineField({
      type: "address",
      name: "address",
    }),
    defineField({
      name: "services",
      type: "timeArray",
    }),
    defineField({
      title: "Social Media Links",
      name: "socialLinks",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      title: "Main navigation",
      name: "mainNavigation",
      description: "Select pages for the top menu. ",
      validation: (Rule) => [
        Rule.max(5).warning("Are you sure you want more than 5 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
      type: "array",
      of: [
        {
          type: "menuItem",
        },
      ],
    }),
    defineField({
      name: "footerText",
      type: "simplePortableText",
      fieldset: "footer",
    }),
  ],
});
