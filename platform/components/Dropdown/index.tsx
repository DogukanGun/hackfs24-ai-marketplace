
export type DropdownProps = {
    options: string[];
    text: string;
}

const Dropdown = ({ options, text }: DropdownProps) => {
    return (
        <div className="py-10">
            <label className="form-control w-48">
                <div className="label">
                    <span className="text-xl text-black">{text}</span>
                </div>
                <select className="select bg-slate-700 select-bordered">
                    {options.map((option)=>{
                        return (<option>{option}</option>)
                    })}
                </select>
            </label>
        </div>
    )
}


export default Dropdown;