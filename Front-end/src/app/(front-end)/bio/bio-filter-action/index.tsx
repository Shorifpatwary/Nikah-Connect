"use client";

import BioCard from "@/app/(front-end)/bio/bio-card";
import Section from "@/components/blocks/section";
import { ParagraphMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";

interface Props {
  className?: string;
}
const BioFilterAction = ({ className }: Props) => {
  return (
    <div
      className={cn(
        " flex w-full flex-row justify-between align-middle",
        className
      )}
    >
      <Drawer>
        <DrawerTrigger className="flex flex-row items-center gap-2">
          <FilterIcon />
          <ParagraphMd>ফিল্টার করুন</ParagraphMd>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <Section className="py-0" rowClassName="justify-center">
            <ScrollArea className="h-[60vh]  rounded-md border p-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <BioCard gender={"পাত্র"} />
              <BioCard className="mt-6" />
              <ParagraphMd>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                consequatur fuga nostrum hic doloribus pariatur. Voluptates
                magni esse debitis? Iste, expedita labore. Dicta ea veritatis
                eius recusandae, non ab vero tempora laborum dolorum natus ex
                eum odio blanditiis veniam ducimus rerum voluptas a! Distinctio
                possimus, quos fugit suscipit ducimus totam veritatis quae rerum
                ullam. Veniam odit suscipit mollitia unde provident pariatur
                neque quas! Autem soluta, reprehenderit quo fugit officiis saepe
                doloribus provident molestias repellendus distinctio mollitia
                facere iure! Nemo error ex itaque officiis optio tempore eum
                voluptatem! Deleniti eaque mollitia ipsum facilis nesciunt animi
                similique. Voluptate nobis dolore placeat molestiae! Eos ratione
                impedit adipisci iusto, deserunt et magni numquam, animi,
                cupiditate excepturi ad quam neque saepe? Quas impedit facere
                harum dolorum sed fugit aut officia. Dolor odio asperiores fuga
                cumque sequi rerum voluptates assumenda doloremque perferendis
                nobis cum atque, sit debitis exercitationem maxime, rem ipsa
                minus accusamus doloribus quasi? Cum ducimus error odio earum
                minus illo quas dolor necessitatibus, a consequatur eos quam
                aperiam at. Necessitatibus reiciendis sequi quo architecto quod
                dolores, asperiores impedit recusandae suscipit est fuga
                molestiae ex! Dignissimos adipisci debitis consequuntur atque
                aliquid iste, vitae accusamus, sunt dolore sint, dolorem
                deleniti aut ducimus deserunt placeat maiores earum ea eius?
                Temporibus laboriosam doloribus vitae laborum suscipit quaerat
                dignissimos voluptates minus delectus at? Atque at ratione ab
                praesentium accusantium natus deserunt sunt sit quod officia
                nostrum dolorum harum saepe cumque hic, in ut aspernatur eveniet
                tempore molestiae, eaque nesciunt sapiente blanditiis. Incidunt,
                est vel unde dignissimos blanditiis in amet pariatur eveniet
                natus accusamus ratione commodi labore ullam quos! Dolores
                molestias dicta laudantium quod veniam in. Labore
                exercitationem, repellendus odio sunt distinctio natus ipsa
                suscipit qui. In, magni consectetur? Repellat quam omnis facilis
                labore ab, facere, quo consectetur eius eaque architecto
                placeat? Debitis at animi ratione assumenda veritatis modi quo
                nisi blanditiis ullam numquam! Corporis quaerat qui impedit
                nobis magnam! Cupiditate rerum ad maxime veniam a sint
                laboriosam soluta, eaque, maiores autem, delectus neque debitis
                ullam totam? Deserunt totam fugiat nemo nihil laudantium dolor?
                Dolor placeat inventore et consequatur maxime blanditiis ea
                quisquam dignissimos aspernatur asperiores, nesciunt provident
                expedita? Odit consequatur blanditiis temporibus facere quaerat
                dignissimos adipisci assumenda earum
              </ParagraphMd>
            </ScrollArea>
          </Section>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BioFilterAction;
