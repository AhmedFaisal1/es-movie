import React, {ReactNode} from "react";

interface TopSectionProps{
  children: ReactNode;

}
const TopSection : React.FC<TopSectionProps> = ({ children }) => {
  return <div className="py-28 md:py-36 space-y-10">{children}</div>;
};

export default TopSection;
