import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Command,
	CommandInput,
	Button,
	CommandList,
	CommandItem,
} from "@/components";
import { cn } from "@/lib/utils";
import { QueryBuilderShadCNContext } from "@/providers/qbshadcnprovider";
import { ShadCNFieldSelectorProps } from "@/types";
import { CalendarIcon, LetterCaseCapitalizeIcon, PlusIcon, TimerIcon } from "@radix-ui/react-icons";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { CommandGroup } from "cmdk";
import { cloneElement, isValidElement, ReactElement, useContext, useMemo, useState } from "react";
import { FieldSelectorProps, FullField, getOption } from "react-querybuilder";

export const ShadCNFieldSelector = (allProps: ShadCNFieldSelectorProps) => {
	const [open, setOpen] = useState(false);

	const {
		disabled,
		options,
		handleOnChange,
		title,
		testID,
		value,
		operator,
		className,
		level,
		path,
		context,
		validation,
		schema,
		rule,
		triggerElement: TriggerElement,
	} = allProps;
	const { recentField, setRecentField } = useContext(QueryBuilderShadCNContext);
	const valueOption = useMemo(() => getOption(options, value ?? ""), [options, value]);

	const renderIcon = (opt: any) => {
		switch (opt.inputType) {
			case "datetime-local":
				return <CalendarIcon width={15} />;
			case "time":
				return <TimerIcon width={15} />;
			default:
				return <LetterCaseCapitalizeIcon width={15} />;
		}
	};

	const renderTrigger = () => {
		if (TriggerElement) {
			return <TriggerElement disabled={disabled} className={className} />;
		}

		return (
			<Button
				className="bg-input text-foreground min-w-content max-w-[300px] max-h-input hover:border-primary hover:border-input-placeholder hover:ring-1 hover:text-primary"
				disabled={disabled}
				data-testid={testID}
			>
				{value && valueOption ? valueOption.label : "Select a field"}
			</Button>
		);
	};

	if (level === 0) {
		return null;
	}

	return (
		<>
			<div>
				<Popover
					onOpenChange={(val) => {
						val ? setTimeout(() => setOpen(val), 50) : setOpen(val);
					}}
				>
					<PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
					<PopoverContent className="p-0 w-full" side="bottom" align="start">
						<Popover open={open}>
							<PopoverAnchor className="p-3 pb-0">
								<div>
									<Command>
										<div className="flex items-center gap-3 mb-5 mx-1 my-1">
											<CommandInput placeholder="Search..."></CommandInput>
											<Button variant="ghost" className="gap-2 border-">
												<PlusIcon /> Create
											</Button>
										</div>
										<div className="flex">
											<div className="border-r border-outline pr-2">
												<ul>
													<li
														className={cn(
															"flex items-center gap-1 text-[12px] px-2 py-[8px] rounded-md min-w-[100px] leading-none font-bold",
															"hover:bg-primary-rgb-light hover:text-primary-rgb [&.active]:bg-primary-rgb-light [&.active]:text-primary-rgb",
															"active"
														)}
													>
														<LetterCaseCapitalizeIcon width={15} />{" "}
														<span className="leading-none">All</span>
													</li>
												</ul>
											</div>
											<div className="px-2">
												<div className="pl-2">
													<span className="text-[12px] text-foreground-gray mb-2 block">
														Recents
													</span>
													<span className="text-sm flex items-center leading-none gap-2">
														<LetterCaseCapitalizeIcon width={18} />{" "}
														{recentField && recentField.label}
													</span>
												</div>
												<hr className="border-outline my-3 ml-2" />
												<CommandList>
													<span className="text-[12px] text-foreground-gray pl-2">
														All Properties
													</span>
													<CommandGroup className="mb-2">
														{options.map((option: any) => (
															<CommandItem
																data-state-active={
																	option.value === value
																}
																key={option.value}
																value={option}
																className="text-sm data-[state-active=true]:bg-primary data-[state-active=true]:text-primary-foreground gap-2 w-min-content max-w-[300px] rounded-md"
																onSelect={() => {
																	setRecentField(option);
																	handleOnChange(option.value);
																}}
															>
																<span className="flex items-center gap-2 text-nowrap text-ellipsis line-clamp-1">
																	{renderIcon(option)}{" "}
																	{option.label}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</div>
										</div>
									</Command>
								</div>
							</PopoverAnchor>
							<PopoverContent side="right" align="start">
								{value && valueOption && (
									<span>
										{renderIcon(valueOption)} {valueOption.label}
									</span>
								)}
							</PopoverContent>
						</Popover>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};
