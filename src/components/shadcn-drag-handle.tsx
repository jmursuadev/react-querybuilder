import { forwardRef } from "react";
import {
	defaultControlElements,
	DragHandleProps,
	isRuleGroupType,
	isRuleGroupTypeIC,
} from "react-querybuilder";

export const ShadCNDragHandle = forwardRef<HTMLSpanElement, DragHandleProps>((props, ref) => {
	const { ruleOrGroup } = props;
	const { dragHandle: DragHandle } = defaultControlElements;
	console.log("DRAG", props);

	if ((isRuleGroupType(ruleOrGroup) || isRuleGroupTypeIC(ruleOrGroup)) && ruleOrGroup.rules) {
		return (
			<>
				<DragHandle {...props} ref={ref} />{" "}
				<span className="text-[12px] text-tertiary-foreground font-bold">ALL USERS</span>
			</>
		);
	}

	return null;
});
ShadCNDragHandle.displayName = "ShadCNDragHandle";
