import { ValidatedForm, useField, useIsSubmitting } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ContactEmail } from "~/routes/resources.contactForm";
import { Send } from "lucide-react";
import { cn } from "~/lib/misc";
import { toTitleCase } from "~/lib/toTitleCase";
import { HTMLInputTypeAttribute } from "react";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { useGoogleRecaptcha } from "~/lib/useGoogleRecaptcha";
import { Action } from "./Action";
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

// const FormInput = ({
//   name,
//   label,
//   type = "text",
//   placeholder,
// }: FormInputProps) => {
//   const { error, getInputProps } = useField(name);
//   return (
//     <div className="w-full flex flex-col @sm:flex-row items-center gap-1 @sm:gap-4 justify-between">
//       <label
//         htmlFor={name}
//         className="form-label font-semibold self-start @sm:self-center"
//       >
//         {label}
//       </label>
//       <div className={cn("flex-1 max-w-96 flex flex-col w-full", error && " gap-1")}>
//         {type === "textarea" ? (
//           <textarea
//             rows={4}

//             className="resize-y w-full"
//             {...getInputProps({ id: name, placeholder: placeholder ?? label })}
//           />
//         ) : (
//           <input
//             {...getInputProps({
//               id: name,
//               placeholder: placeholder ?? label,
//               type,
//             })}
//             className="border-gray/30 rounded-sm w-full"
//           />
//         )}
//         {error && <span className="text-sm text-[#ff0000]">{error}</span>}
//       </div>
//     </div>
//   );
// };

export const ContactForm = () => {
  // const isSubmitting = useIsSubmitting("contactForm");
  // const [searchParams] = useSearchParams();
	// const submit = useSubmit()

  // const recaptcha = useGoogleRecaptcha({
  //   siteKey: '6LcBb7YpAAAAAHIRznLVTNVMkAPfhpBeeXFSpbna',
  //   action: 'submit',
  // })



  return (
    <ContactEmail />
    // <ValidatedForm
    //   id="contactForm"
    //   validator={contactFormValidator}
    //   // action="/resources/contactForm"
    //   // method="post"
    //   onSubmit={async (deets, event) => {
        
    //     event.preventDefault()
    //     const token = await recaptcha.execute()
    //     // update and submit form

    //     // add token to form
    //     deets.captchaToken = token;
    //     // finally submit the form data, re-using the method and action from the form
    //     submit(deets, {
    //       method: `POST`,
    //       action: `/resources/contactForm`,
    //     });
    //     console.log("form submitted")

       
    //   }}
    //   defaultValues={{
    //     name: "",
    //     phone: "",
    //     subject: {
    //       label: `${searchParams.get("subject") || "General Inquiry"}`,
    //       value: `${searchParams.get("subjectId") || "generalInquiry"}`,
    //     },

    //     message: ``,
    //     email: "",
    //   }}
    //   className="@container flex gap-4 flex-col px-8 w-full max-w-[550px] mx-auto"
    // >
    //   <h2 className="text-center">Send us a message!</h2>
    //   <p className="[clip:rect(0 0 0 0)] absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-0 p-0">
    //     <label htmlFor="got-ya">
    //       Don’t fill this out if you’re human:{` `}
    //       <input tabIndex={-1} type="text" name="got-ya" autoComplete="false" />
    //     </label>
    //   </p>
    //   <FormInput type="text" name="name" label="Full Name" />
    //   <FormInput
    //     type="email"
    //     name="email"
    //     label="Email"
    //     placeholder="Please enter your email"
    //   />
    //   <FormInput
    //     type="tel"
    //     name="phone"
    //     label="Phone"
    //     placeholder="Please enter a valid U.S phone number"
    //   />
    //   <div className="w-full flex flex-col @sm:flex-row items-center gap-1 @sm:gap-4 justify-between">
    //     <label
    //       htmlFor="subject"
    //       className="form-label font-semibold self-start @sm:self-center"
    //     >
    //       Subject
    //     </label>
    //     <CustomSelect
    //       // defaultValue={defaultSubject}
    //       name="subject"
    //       label="Subject"
    //       className="flex-1 max-w-96 w-full border-gray/30 rounded-sm"
    //     />
    //   </div>

    //   <FormInput
    //     type="textarea"
    //     name="message"
    //     label="Message"
    //     placeholder="Please leave a detailed message"
    //   />

    //   <div className="ml-auto">
    //     <button
    //       type="submit"
    //       disabled={!recaptcha.ready || isSubmitting}
    //       className="border-black border-[1px] text-black  hover:bg-black hover:border-black hover:text-white	focus:text-white focus:bg-black focus:border-black uppercase no-underline font-semibold tracking-[1.6px] p-2 transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md flex gap-1"
    //     >
    //       <Send />
    //       {isSubmitting ? "Sending..." : "Send Message"}
    //     </button>
    //   </div>
    // </ValidatedForm>
  );
};
