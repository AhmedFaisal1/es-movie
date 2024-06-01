import React,{ReactNode} from "react";

interface OtherSectionProps{
  children: ReactNode;
}
const OtherSection :React.FC<OtherSectionProps> = ({ children }) => {
  return <div className="pb-20 space-y-10">{children}</div>;
};

export default OtherSection;
