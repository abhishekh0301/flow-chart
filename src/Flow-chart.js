import React, { useEffect, useState } from "react";
const UpdatableEdge = () => {
	const [elements] = useState({
		projetcName: "Build-Car",
		startDate: "Thu Nov 05 2020 11:20:12 GMT+0530 (India Standard Time)",
		endDate: "Thu Nov 15 2020 11:20:12 GMT+0530 (India Standard Time)",
		root: {
			task1: { name: "BuildFrame", prevTask: "", nextTask: "task2" },
			task2: { name: "BuildBody", prevTask: "task1", nextTask: "task4" },
			task3: { name: "TestCar", prevTask: "task4", nextTask: "" },
			task4: { name: "FitTyre", prevTask: "task2", nextTask: "task3" },
		},
	});
	const [leftPadding, setLeftPadding] = useState([]);
	const [left] = useState([175, 375, 650]);
	const [top] = useState([350, 750, 750]);
	const [arrow] = useState([
		{
			width: "0",
			height: "0",
			left: "280px",
			top: "338px",
			"border-top": "15px solid transparent",
			"border-bottom": "15px solid transparent",
			"border-left": "20px solid blue",
			position: "absolute",
			float: "right",
		},
		{
			width: "0",
			height: "0",
			left: "480px",
			top: "740px",
			"border-top": "15px solid transparent",
			"border-bottom": "15px solid transparent",
			"border-left": "20px solid blue",
			position: "absolute",
			float: "right",
		},
		{
			width: "0",
			height: "0",
			left: "760px",
			top: "600px",
			"border-left": "15px solid transparent",
			"border-right": "15px solid transparent",
			"border-bottom": "20px solid blue",
			position: "absolute",
			float: "right",
		},
	]);
	useEffect(() => {
		let data = Object.keys(elements.root);
		let new_array = [data[0]];
		Object.entries(elements.root).forEach(([key, value]) => {
			new_array.push(value.nextTask);
		});
		let convertToInt = new_array
			.filter((i) => i)
			.map((ele) => {
				return parseInt(ele.substring(4)) - 1;
			});
		setLeftPadding(convertToInt);
		console.log("convertToInt ", convertToInt);
	}, []);

	return (
		<>
			{Object.entries(elements.root).map(([key, value], index) => {
				return (
					<>
						<div
							style={{
								border: "1px solid black",
								top: `${index * 200 + 100}px`,
								left: `${
									leftPadding.findIndex(
										(element) => element === index
									) *
										200 +
									100
								}px`,
								width: "140px",
								height: "100px",
								position: "absolute",
								backgroundColor: "blue",
								textAlign: "center",
							}}
						>
							<div>{key}</div>
							<div>{value.name}</div>
						</div>
						{leftPadding.length > index + 1 ? (
							<div
								style={{
									"border-left": "6px solid blue",
									height: `${
										Math.abs(
											leftPadding[index + 1] -
												leftPadding[index]
										) === 1
											? 150
											: 350
									}px`,
									top: `${index * 200 + 200}px`,
									position: "absolute",
									left: `${
										leftPadding.findIndex(
											(element) => element === index
										) *
											200 +
										175
									}px`,
									"margin-left": "-3px",
								}}
							></div>
						) : (
							""
						)}
						{left.length > index ? (
							<div>
								<div
									style={{
										backgroundColor: "blue",
										display: "block",
										left: `${left[index]}px`,
										width: "125px",
										height: "6px",
										position: "absolute",
										top: `${top[index]}px`,
									}}
								></div>
								<div style={{ ...arrow[index] }}></div>
							</div>
						) : (
							""
						)}
					</>
				);
			})}
		</>
	);
};

export default UpdatableEdge;
