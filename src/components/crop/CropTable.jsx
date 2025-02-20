

export const CropTable = () => {
    const cropList = [
        {
            id: 1,
            cropName: "chilli",
            cropType: "vegetables"
        },
        {
            id: 2,
            cropName: "potato",
            cropType: "vegetables"
        }
    ];
    
    return(
        <div className="relative overflow-x-auto shadow-md max-h-[70%]">
            <table className="w-full bg-black-200 text-base text-center">
                <thead className= "text-lg uppercase">
                    <tr className="border-y">
                        <th scope="col" className="px-6 py-5 border-x">
                            crop name
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            crop type
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cropList.map((crop) => (
                            <tr key={crop.id} className="capitalize border-y text-[#915EFF]">
                                <td className="px-6 py-4 border-x">
                                    {crop.cropName}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {crop.cropType}
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}