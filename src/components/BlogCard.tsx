import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  icon: string;
}

const BlogCard = ({ title, description, date, readTime, slug, icon }: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/80 backdrop-blur-sm border-2 hover:border-primary">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon name={icon} className="text-primary" size={28} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 text-gray-800">{title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <div className="mt-4 flex items-center text-primary font-medium">
            Читать статью
            <Icon name="ChevronRight" size={18} className="ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
