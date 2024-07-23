import { forwardRef } from "react";
import {
	defaultControlElements,
	DragHandleProps,
	isRuleGroupType,
	isRuleGroupTypeIC,
} from "react-querybuilder";

const ShadCNDragHandle = forwardRef<HTMLSpanElement, DragHandleProps>((props, ref) => {
	const { ruleOrGroup } = props;
	const { dragHandle: DragHandle } = defaultControlElements;

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

export { ShadCNDragHandle };
