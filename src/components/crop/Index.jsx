import { CropTable } from "./CropTable";

const Crop = () => {
    

    return(
        <div>
            <div className="flex justify-end">
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-8 py-3 mb-2 uppercase">
                    add
                </button>
            </div>
            
            <CropTable />
        </div>
    )
}

export default Crop;