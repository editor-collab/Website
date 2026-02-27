"use client";

import { ShoppingBag, ExclamationShapeFill } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import RichText from "@/components/sections/RichText";
import PURCHASE_DATA from "@/data/purchase.json";

const { stripeUrl: STRIPE_URL, beforePurchaseContent: CONTENT } = PURCHASE_DATA;

export default function BeforePurchaseModal() {
  return (
    <Modal>
      <Button>
        <ShoppingBag />
        Get it now.
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <ExclamationShapeFill className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Please read before buying.</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <RichText content={CONTENT} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="w-full"
                slot="close"
                onPress={() => window.open(STRIPE_URL, "_blank")}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
