import { Button, ButtonProps } from "@/components";
import { Component, ComponentType, ReactElement } from "react";
import { FieldSelectorProps, RuleType } from "react-querybuilder";

/**
 * Extended FieldSelectorProps make schema optional
 * triggerElement will render a button with a PlusIcon by default
 */
export interface ShadCNFieldSelectorProps extends Omit<FieldSelectorProps, "schema"|"rule"> {
	schema?: any;
	triggerElement?: ComponentType<ButtonProps>;
	rule?: RuleType
}
