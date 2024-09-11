import Marquee from "react-fast-marquee";

type Props = {
  message: string | undefined;
};

const SlideShow: React.FC<Props> = (props) => {
  return (
    <Marquee className="p-4 bg-orange-500 font-mono text-xl md:text-2xl border-t-2 border-b-2 flex flex-row gap-4 border-black  shadow-lg font-bold text-white">
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
      <div className="ml-8">{props.message}</div>
    </Marquee>
  );
};

export default SlideShow;
