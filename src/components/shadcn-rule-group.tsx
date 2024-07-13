import { memo } from "react";
import {
	RuleGroupProps,
	useRuleGroup,
	useStopEventPropagation,
	TestID,
	RuleGroupHeaderComponents,
	RuleGroupBodyComponents,
	RuleGroupType,
} from "react-querybuilder";
import { ShadCNAddRule } from "@/components";

/**
 * Extended RuleGroup component
 * Default component to display {@link RuleGroupType} and {@link RuleGroupTypeIC}
 * objects. This is actually a small wrapper around {@link RuleGroupHeaderComponents}
 * and {@link RuleGroupBodyComponents}.
 */
export const ShadCNRuleGroup = memo((props: RuleGroupProps) => {
	const rg = useRuleGroup(props);

	const addRule = useStopEventPropagation(rg.addRule);
	const addGroup = useStopEventPropagation(rg.addGroup);
	const cloneGroup = useStopEventPropagation(rg.cloneGroup);
	const toggleLockGroup = useStopEventPropagation(rg.toggleLockGroup);
	const removeGroup = useStopEventPropagation(rg.removeGroup);
	const shiftGroupUp = useStopEventPropagation(rg.shiftGroupUp);
	const shiftGroupDown = useStopEventPropagation(rg.shiftGroupDown);

	return (
		<div
			ref={rg.previewRef}
			title={rg.accessibleDescription}
			className={rg.outerClassName}
			data-testid={TestID.ruleGroup}
			data-dragmonitorid={rg.dragMonitorId}
			data-dropmonitorid={rg.dropMonitorId}
			data-rule-group-id={rg.id}
			data-level={rg.path.length}
			data-path={JSON.stringify(rg.path)}
		>
			<div ref={rg.dropRef} className={rg.classNames.header}>
				<RuleGroupHeaderComponents
					{...(rg as Parameters<typeof RuleGroupHeaderComponents>[0])}
					addRule={addRule}
					addGroup={addGroup}
					cloneGroup={cloneGroup}
					toggleLockGroup={toggleLockGroup}
					removeGroup={removeGroup}
					shiftGroupUp={shiftGroupUp}
					shiftGroupDown={shiftGroupDown}
				/>
			</div>
			<div className={rg.classNames.body}>
				<RuleGroupBodyComponents
					{...(rg as Parameters<typeof RuleGroupBodyComponents>[0])}
					addRule={addRule}
					addGroup={addGroup}
					cloneGroup={cloneGroup}
					toggleLockGroup={toggleLockGroup}
					removeGroup={removeGroup}
					shiftGroupUp={shiftGroupUp}
					shiftGroupDown={shiftGroupDown}
				/>
				<ShadCNAddRule
					key={TestID.addRule}
					testID={TestID.addRule}
					label={rg.translations.addRule.label}
					title={rg.translations.addRule.title}
					className={rg.classNames.addRule}
					handleOnClick={addRule}
					rules={rg.ruleGroup.rules}
					level={rg.path.length}
					path={rg.path}
					disabled={rg.disabled}
					context={rg.context}
					validation={rg.validationResult}
					ruleOrGroup={rg.ruleGroup as RuleGroupType}
					schema={rg.schema}
				/>
			</div>
		</div>
	);
});
ShadCNRuleGroup.displayName = "ShadCNRuleGroup";
