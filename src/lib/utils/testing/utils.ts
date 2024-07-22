import { shadcnControlElements } from "@/contexts/qb-shadcn-context";
import { Classnames, defaultCombinators, FullField, Schema } from "react-querybuilder";

const admonish = (fn: string) => () => {
	throw new Error(`Implement schema.${fn} for this test.`);
};

export const basicSchema: Schema<FullField, string> = {
	qbId: "qbId",
	fields: [],
	fieldMap: {},
	classNames: {} as Classnames,
	combinators: defaultCombinators,
	controls: shadcnControlElements,
	createRule: admonish("createRule"),
	createRuleGroup: admonish("createRuleGroup"),
	dispatchQuery: admonish("dispatchQuery"),
	getQuery: admonish("getQuery"),
	getOperators: admonish("getOperators"),
	getValueEditorType: admonish("getValueEditorType"),
	getValueEditorSeparator: admonish("getValueEditorSeparator"),
	getValueSources: admonish("getValueSources"),
	getInputType: admonish("getInputType"),
	getValues: admonish("getValues"),
	getRuleClassname: admonish("getRuleClassname"),
	getRuleGroupClassname: admonish("getRuleGroupClassname"),
	accessibleDescriptionGenerator: admonish("accessibleDescriptionGenerator"),
	showCombinatorsBetweenRules: false,
	showNotToggle: false,
	showShiftActions: false,
	showCloneButtons: false,
	showLockButtons: false,
	autoSelectField: true,
	autoSelectOperator: true,
	addRuleToNewGroups: false,
	enableDragAndDrop: false,
	validationMap: {},
	independentCombinators: false,
	listsAsArrays: false,
	parseNumbers: false,
	disabledPaths: [],
};
