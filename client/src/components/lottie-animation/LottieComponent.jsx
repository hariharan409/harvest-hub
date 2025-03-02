import Lottie from "lottie-react";
import { appleTreeAnimation, pageNotFound,windAnimation } from "../../assets";

export const AppleTreeAnimation = () => (
    <Lottie animationData={appleTreeAnimation} loop={true} style={{width: "100%"}} />
);

export const PageNotFoundAnimation = () => (
    <Lottie animationData={pageNotFound} loop={true} style={{width: "100%"}} />
);

export const WindAnimation = () => (
    <Lottie animationData={windAnimation} loop={true} style={{width: "100%"}} />
);