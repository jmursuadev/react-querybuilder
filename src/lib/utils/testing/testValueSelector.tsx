import { TestID, toFullOption, ValueSelectorProps } from "react-querybuilder";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { basicSchema } from "./utils";

const defaultValueSelectorProps = {
	handleOnChange: () => {},
	schema: basicSchema,
	options: [
		{
			label: "Option 1",
			name: "option-1",
		},
		{
			label: "Option 2",
			name: "option-2",
		},
		{
			label: "Option 3",
			name: "option-3",
		},
	].map((opt) => toFullOption(opt)),
	testID: TestID.valueSourceSelector,
	value: "option-3",
	path: [],
	level: 0,
} satisfies ValueSelectorProps;

const testComboBox = (
	title: string,
	Component: React.ComponentType<ValueSelectorProps>,
	props: any
) => {
	test(`${title} is rendered correctly`, async () => {
		render(<Component {...props} />);

		const select = screen.getByTestId(TestID.valueSourceSelector);
		expect(select).toBeInTheDocument();
		// expect(select).toHaveValue("option-3");
		// expect(select).toHaveTextContent("Option 3");
	});
};

export const testValueSelector = (Component: React.ComponentType<ValueSelectorProps>) => {
	testComboBox("Value Selector", Component, defaultValueSelectorProps);
};
