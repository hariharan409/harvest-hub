import moment from "moment";


const Footer = () => {
    const year = moment().format("YYYY");

    return(
        <div className="text-center fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-tertiary w-full">
            <span className="text-xs text-gray-300">
                @ {year} <span className="hover:underline text-[#915EFF]">Blackcode {'</>💻'}</span>. All Rights Reserved.
            </span>
        </div>
    )
}

export default Footer;