
const JournalInsertTemplate = () => {
    return (
        <div>
            <div className='   rounded-md  flex flex-col gap-2 '>

                <div className='mt-2'>
                    <textarea
                        placeholder="Click here to start typing your notes..."

                        className="border border-[#3b4154] resize-none   placeholder-[#626f8e] font-[600] rounded-md w-full h-[80px] p-3 text-sm focus:outline-none"
                    ></textarea>
                </div>


                <div className='flex justify-end'>
                    <button className={`  cursor-pointer  py-2 rounded-lg text-[12px]  border font-[700] border-[#3b4154] hover:bg-HoverSide-dark
                     px-4
        `}>

                        Insert template
                    </button>
                </div>


            </div>
        </div>
    )
}

export default JournalInsertTemplate
