import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ContactEmail } from "~/routes/resources.contactForm";
import { HTMLInputTypeAttribute } from "react";
export const contactFormValidator = withZod(
  z.object({
    "got-ya": z.string().optional(),
    captchaToken: z.any().nullish(),
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(2, { message: "Email is required" })
      .email("Must be a valid email"),
    phone: z.string().nullish(),
    subject: z.any().nullish(),
    message: z
      .string()
      .min(15, { message: "Please leave a more detailed message" }),
    ministries: z.string().nullish(),
  })
);

type FormInputProps = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute | "textarea";
  placeholder?: string;
};

export const ContactForm = () => {
  return (
    <div className="max-w-sm">
      <h2 className="mb-8 text-center">Send us a message</h2>
      <ContactEmail />
    </div>
  );
};
