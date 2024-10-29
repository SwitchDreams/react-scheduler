import {
  Config,
  FocusedData,
  SchedulerData,
  SchedulerItemClickData,
  SchedulerProjectData
} from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type SchedulerProps = {
  data: SchedulerData;
  isLoading?: boolean;
  config?: Config;
  startDate?: string;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onTileClick?: (data: SchedulerProjectData) => void;
  onFilterData?: () => void;
  onClearFilterData?: () => void;
  onItemClick?: (data: SchedulerItemClickData) => void;
  onClickDay?: (e: MouseEvent, data: FocusedData, currentPageNum: number) => void;
  onSearch?: (phrase: string) => void;
};

export type StyledOutsideWrapperProps = {
  showScroll: boolean;
};
