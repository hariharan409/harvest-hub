import { PageNotFoundAnimation } from "../lottie-animation/LottieComponent"


const PageNotFound = () => {

    return(
        <div className="w-full flex justify-center">
            <div className="w-[50%]">
                <PageNotFoundAnimation />
            </div>
        </div>
    )
}

export default PageNotFound;