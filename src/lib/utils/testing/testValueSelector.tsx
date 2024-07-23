import { TestID, toFullOption, ValueSelectorProps } from "react-querybuilder";
import { getByRole, getByText, queryByAttribute, render, screen } from "@test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
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
	test(`${title} and value is rendered correctly`, async () => {
		render(<Component {...props} />);

		const user = userEvent.setup();

		const select = await screen.getByTestId(TestID.valueSourceSelector);
		expect(select).toBeInTheDocument();

		await user.click(select);

		/**
		 * Check if the content popover is visible
		 */
		const selectWrapper = await document.querySelector(
			"div[data-radix-popper-content-wrapper]"
		);
		expect(selectWrapper).toBeInTheDocument();

		if (!selectWrapper) {
			throw new Error("Select wrapper not found");
		}

		/**
		 * Check if the item is selected correctly
		 */
		const selectItem = getByText(selectWrapper as HTMLElement, "Option 3");
		await user.click(selectItem);
		expect(select).toHaveTextContent("Option 3");
	});
};

export const testValueSelector = function (Component: React.ComponentType<ValueSelectorProps>) {
	testComboBox("Value Selector", Component, defaultValueSelectorProps);
};
