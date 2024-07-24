import {
	FieldSelectorProps,
	RuleType,
	TestID,
	toFullOption,
	ValueSelectorProps,
} from "react-querybuilder";
import { getByText, render, screen, waitFor } from "@test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { basicSchema } from "./utils";
import { ShadCNFieldSelectorProps } from "@/types";
import fields from "@/data/fields";

const defaultFieldSelectorProps = {
	handleOnChange: () => {},
	schema: basicSchema,
	options: fields().map((opt) => toFullOption(opt)),
	testID: TestID.valueEditor,
	value: "firstName",
	operator: "=",
	path: [],
	level: 2,
	title: "Field Selector",
} satisfies ShadCNFieldSelectorProps;

const testFieldSelector = (Component: React.ComponentType<ValueSelectorProps>) => {
	test(`${defaultFieldSelectorProps.title} is rendered correctly`, async () => {
		render(<Component {...defaultFieldSelectorProps} />);

		const user = userEvent.setup();

		const select = await screen.getByTestId(TestID.valueEditor);
		expect(select).toBeInTheDocument();

		await user.click(select);

		/**
		 * Check if the content popover is visible
		 */
		const fieldContentWrapper = await document.querySelector(
			"div[data-radix-popper-content-wrapper]:has(.field-selector-content)"
		);
		expect(fieldContentWrapper).toBeVisible();

		/**
		 * Check if the item is selected correctly
		 */
		const selectItem = await document.querySelector(
			"div[data-radix-popper-content-wrapper]:has(.field-selector-content) div[data-value=Age]"
		);
		expect(selectItem).toBeVisible();
		await user.click(selectItem as HTMLElement);

		waitFor(
			() => {
				expect(select).toHaveTextContent("Age");
			},
			{ timeout: 1000 }
		);
	});

	test(`${defaultFieldSelectorProps.title} is disabled`, async () => {
		render(<Component {...defaultFieldSelectorProps} disabled={true} />);

		const select = await screen.getByTestId(TestID.valueEditor);
		expect(select).toBeDisabled();
	});
};

export { testFieldSelector };
