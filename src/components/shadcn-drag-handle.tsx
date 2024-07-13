import { forwardRef } from "react";
import { defaultControlElements, DragHandleProps, isRuleGroupType } from "react-querybuilder";

export const ShadCNDragHandle = forwardRef<HTMLSpanElement, DragHandleProps>((props, ref) => {
	const { ruleOrGroup } = props;
	const { dragHandle: DragHandle } = defaultControlElements;

	if (isRuleGroupType(ruleOrGroup) && ruleOrGroup.rules) {
		return (
			<>
				<DragHandle {...props} />{" "}
				<span className="text-[12px] text-tertiary-foreground font-bold">ALL USERS</span>
			</>
		);
	}

	return null;
});
ShadCNDragHandle.displayName = "ShadCNDragHandle";
