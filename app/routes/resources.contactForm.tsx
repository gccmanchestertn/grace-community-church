import { useFetcher } from "@remix-run/react";
import {
  LoaderFunctionArgs,
  json
} from "@vercel/remix";
import { HTMLInputTypeAttribute, useEffect } from "react";
import { loadQuery } from "~/sanity/loader.server";
import { ALL_MINISTRIES, SITE_CONFIG_QUERY } from "~/sanity/queries";
import {
  useControlField,
  setFormDefaults,
  ValidatedForm,
  useIsSubmitting,
  validationError,
} from "remix-validated-form";
import { Send } from "lucide-react";
import { SiteConfigDocument, siteConfigZ } from "~/types/siteConfig";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const data = await loadQuery<SiteConfigDocument>(SITE_CONFIG_QUERY).then((res) => ({
    ...res,
    data: res
      ? siteConfigZ.parse(res.data)
      : null,
  }));

  if (!data?.data?.length) {
    throw new Response("Not found", { status: 404 });
  }

  return json({
    email: data.data[0]?.email || "",
  });
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   sgMail.setApiKey(process.env.SENDGRID_KEY as string);
//   const formData = await request.formData();
//   const result = await contactFormValidator.validate(formData);


//   const captchaResponse = await fetch(
//     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${result?.submittedData.captchaToken}`,
//     {
//       method: `POST`,
//     }
//   ).then((res) => res.json());

//   if (captchaResponse < 0.5) {
//     return redirect(`/`);
//   }

//   if (result.error) {
//     return validationError(result.error);
//   }

//   if (result.submittedData[`got-ya`]?.length) {
//     return json(
//       { message: `` },
//       { status: 500, statusText: `We don't take kindly to spammers` }
//     );
//   }

//   if (!result.submittedData.captchaToken) {
//     return json({ message: `` }, { status: 500 });
//   }

//   const { email, phone, subject, message, name, ministries , captchaToken} =
//     result.submittedData;
//   const modifiedSubject =
//     JSON.parse(ministries || "").find(
//       (item: { value: string }) => item.value === subject
//     )?.label ?? "General Inquiry";

//     console.log({email, phone, message, name, subject: modifiedSubject, })

//   const sanitySubmission = await writeClient.create({

//     email,
//     phone,
//     message,
//     name,
//     subject: modifiedSubject,
//     recaptchaToken: captchaToken,
//     gotya: result.data["got-ya"],
//     _type: `formSubmission`,
//   });

//   if (!sanitySubmission) {
//     return json(
//       { message: `something went wrong with the form submission` },
//       { status: 500 }
//     );
//   }

//   const emailTemplate = `
// 	<div>
// 	<h1>New Form Submission</h1>
// 	<p><strong>Name: </strong>${name}</p>
// 	<p><strong>Subject: </strong>${modifiedSubject}</p>
// 	<p><strong>Email: </strong><a href="mailto:${email}">${email}</a></p>
// 	<p><strong>Phone: </strong><a href="tel:+1${phone}">${phone}</a></p>
// 	<p><strong>message: </strong>${message}</p>
// 	</div>
// 	`;
//   const msg = {
//     // TODO: Figure out how to dynamically change between to address
//     to: `jon@gccmanchester.com`,
//     from: `info@gccmanchester.com`,
//     replyTo: result?.submittedData?.email,
//     subject: `New contact form submission from ${result?.submittedData.name}`,
//     text: `${result?.submittedData.message}`,
//     html: emailTemplate,
//   };
//   /*



//   if (error) {
// 		return validationError(error)
//   }



//   const assignSubmissionToId = personData?.person.filter(
// 		(person) => person._id !== personData?.lastFormSubmit?.assignedTo?._id,
// 		)

// 		const { shedInfo, ...rest } = submittedData

// 		*/

//   // Send email via sendgrid
//   await sgMail
//     .send(msg)
//     .then(() => {
//       console.log(`Email sent`);
//     })
//     .catch((error) => {
//       console.error(error);
//       return json(
//         { error },
//         { status: 500, statusText: `Error submitting form, please try again` }
//       );
//     });
//   return redirect(`/thank-you`);
// };

export const ContactEmail = () => {
//   const { error, getInputProps, validate } = useField(name);
  const [value, setValue] = useControlField<{ label: string; value: string }>(
    name
  );
  const contactFetcher = useFetcher<typeof loader>();
  const email = contactFetcher.data?.email ?? "";


  useEffect(() => {
    if (contactFetcher.state === "idle" && contactFetcher.data == null) {
      contactFetcher.load(`/resources/contactForm`);
    }
  }, [contactFetcher]);

  return (
    <a href={`mailto:${email}`} className="border-black border-[1px] text-black  hover:bg-black hover:border-black hover:text-white	focus:text-white focus:bg-black focus:border-black uppercase font-semibold tracking-[1.6px] p-4 transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md inline-block">
      Contact <Send className="size-6" />
    </a>
  );
};
