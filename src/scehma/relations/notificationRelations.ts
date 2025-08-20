import { relations } from "drizzle-orm";
import { users } from "../tables/users";
import { notifications } from "../tables/notifications";

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
