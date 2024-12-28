import { cn } from "@/lib/utils";

interface TypographyProps {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}
// large title
export const TitleLg: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "h1",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("fs_7xl font-primary ", className)} {...props}>
      {children}
    </Tag>
  );
};

//  mid title
export const TitleMd: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "h1",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("fs_6xl font-primary ", className)} {...props}>
      {children}
    </Tag>
  );
};

//  small title
export const TitleSm: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "h3",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("fs_5xl font-primary ", className)} {...props}>
      {children}
    </Tag>
  );
};

// large paragraph
export const ParagraphLg: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "p",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("font-primary text-2xl ", className)} {...props}>
      {children}
    </Tag>
  );
};
// mid paragraph
export const ParagraphMd: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "p",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("font-primary text-xl", className)} {...props}>
      {children}
    </Tag>
  );
};
// small paragraph
export const ParagraphSm: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "p",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("font-primary text-base", className)} {...props}>
      {children}
    </Tag>
  );
};
// extra small paragraph
export const ParagraphXS: React.FC<TypographyProps> = ({
  className,
  tag: Tag = "p",
  children,
  ...props
}) => {
  return (
    <Tag className={cn("font-primary text-sm", className)} {...props}>
      {children}
    </Tag>
  );
};
