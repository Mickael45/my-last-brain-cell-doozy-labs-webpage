import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await request.json();
    // const event: Stripe.Event = stripe.webhooks.constructEvent(
    //   signature,
    //   payload,
    //   process.env.STRIPE_WEBHOOKS_SECRET!
    // );
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutId = event.data.object.id;
        await ctx.runMutation(internal.stripe.fulfill, { checkoutId });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return new Response(null, {
      status: 200,
    });
  }),
});
export default http;
