import { SiteConfigDocument } from "~/types/siteConfig";
import { Logo } from "./Logo";
import { ServiceWidget } from "./ServiceWidget";
import { LatestSermonsList } from "./LatestSermons";

export const Footer = (props: SiteConfigDocument) => {
  return (
    <footer className="bg-green-dark px-8 mt-24">
      <div className="container py-16 mx-auto relative flex justify-between items-start gap-16 flex-wrap ">
        <Logo theme="light"  width={450} />
        <div className="flex flex-col gap-6">
          <ServiceWidget
          title=""
					wrapperClassName="my-0"
					showAddress={true}
          _type="timeArray"
          address={props?.address}
          times={props?.services}
          theme="light"
        />
        {props?.phoneNumber && (
          <div className="flex gap-6 items-center text-base justify-center">
            <span className="text-white font-semibold">Phone:</span>
            <a className="text-white" href={`tel:${props.phoneNumber}`}>{props.phoneNumber}</a>
          </div>
        )}
        </div>
        
        <LatestSermonsList theme="light" />
      </div>
      <div className="flex items-center justify-center relative mx-auto container  py-2 ">
        <small className=" absolute left-0  z-10 text-white text-xs mr-auto">
          Website design by{" "}
          <a
            target="_blank"
            className="italic font-light underline"
            href="https://www.dauntlesspursuitmedia.com"
            rel="noreferrer"
          >
            Dauntless Pursuit Media
          </a>
        </small>
        <small className="text-white  text-center">
          &copy; 2024, Grace Community Church
        </small>
      </div>
    </footer>
  );
};
