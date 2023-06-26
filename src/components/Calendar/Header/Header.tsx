import { FC, useCallback, useEffect, useRef } from "react";
import { boxHeight, headerHeight, screenWidthMultiplier, canvasHeaderWrapperId } from "@/constants";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { drawHeader } from "@/utils/drawHeader/drawHeader";
import { HeaderProps } from "./types";
import { StyledCanvas, StyledOuterWrapper, StyledWrapper } from "./styles";

const Header: FC<HeaderProps> = ({ zoom }) => {
  const { week } = useLanguage();
  const { date, cols, dayOfYear, startDate } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.canvas.width = window.innerWidth * screenWidthMultiplier;
      ctx.canvas.height = headerHeight + 1;

      drawHeader(ctx, zoom, cols, startDate, week, dayOfYear);
    },
    [cols, dayOfYear, startDate, week, zoom]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    window.addEventListener("resize", () => handleResize(ctx));

    return () => window.removeEventListener("resize", () => handleResize(ctx));
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.canvas.height = boxHeight + headerHeight;

    handleResize(ctx);
  }, [date, zoom, handleResize]);

  return (
    <StyledOuterWrapper>
      <StyledWrapper id={canvasHeaderWrapperId}>
        <StyledCanvas ref={canvasRef} />
      </StyledWrapper>
    </StyledOuterWrapper>
  );
};

export default Header;