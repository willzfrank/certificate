import React, { useState, useMemo, useEffect } from "react";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { UserForm } from "./basicinfo";

type ProfessionSelectType = {
	professionList: any;
	label: string;
	id: string;
	index: number;
	updateProfessions: any;
	allUserProfessions: any;
};

const ProfessionSelectField = ({ professionList, label, index, updateProfessions, allUserProfessions }: ProfessionSelectType) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const professions = useMemo(() => {
		if (allUserProfessions?.length === 0) return;

		const newProfessionValue = allUserProfessions[index]?.name;
		if (newProfessionValue === "" || !newProfessionValue) return [...professionList];
		return professionList.filter((pro: any) => pro?.name?.toLowerCase().startsWith(newProfessionValue?.toLowerCase()));
	}, [allUserProfessions, index, professionList]);

	function selectProfession(profession: any) {
		updateProfessions(index, profession?.name);
		setShowDropdown(false);
	}

	const handleChange = (e: any) => {
		setShowDropdown(true);
		updateProfessions(index, e.target.value);
	};

	return (
		<div className="mb-5 w-full form-inputs mt-4 relative md:mt-0">
			<p className="block mb-2 font-normal text-base">{label}</p>

			<div
				className="w-full h-10 flex justify-between items-center pl-3 pr-2 capitalize md:min-w-[400px]  py-2 leading-tight text-gray-700 border border-app-gray rounded"
				onClick={(e) => {
					let target = e.target as HTMLDivElement;
					let input = target.querySelector("input");
					input?.focus();

					setShowDropdown((prev) => !prev);
				}}>
				<input type="text" placeholder={"Choose a profession"} className="capitalize" value={allUserProfessions[index] ? allUserProfessions[index]?.name : ""} onChange={handleChange} />
				<button className="w-5 h-5 flex items-center justify-center ">
					{!showDropdown && <BiChevronDown className="text-black text-xl" />}
					{showDropdown && <BiChevronUp className="text-black text-xl" />}
				</button>
			</div>
			{showDropdown && professions?.length > 0 && (
				<ul className="w-full h-auto absolute bg-white top-[100%] z-[3] overflow-hidden list-none mt-[2px] rounded border-black border-[1px]">
					{professions?.map((profession: any) => (
						<li className="capitalize px-2 py-[4px] hover:text-white hover:bg-blue-700" key={profession.id} value={profession.id} onClick={() => selectProfession(profession)}>
							{profession.name.toLowerCase()}
						</li>
					))}
				</ul>
			)}
			{/* <select
				id={id}
				name={id}
				className=""
				placeholder={label}
				// onChange={onChangeProfession(0)}
				// value={profile?.professionIds ? profile?.professionIds[0] : ""}
			>
				<option value="">Choose a profession</option>
				
			</select> */}
		</div>
	);
};

export default ProfessionSelectField;
