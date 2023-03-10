import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import ip from "ip";
import { prisma } from "../../db";

export const shortenRouter = createTRPCRouter({
  insert: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const address = ip.address();
      console.log(address);
      const token = nanoid(8);
      const shortened = `http://${address}:3000/${token}`;

      await prisma.uRL.create({ data: { original: input.url, token: token } });

      return {
        url: shortened,
      };
    }),
  getOriginal: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      console.log(input);
      if (!input.token) {
        return {
          url: "",
        };
      }

      const original = await prisma.uRL.findFirst({
        where: { token: input.token },
      });

      return {
        url: original?.original,
      };
    }),
});
