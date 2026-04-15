import { z } from "zod"

const toolSchema = z.enum(["email", "calendar", "finance", "documents", "other"])

const riskLevelSchema = z.enum(["low", "medium", "high"])

export const approvalSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  actionType: z.string().min(1),
  tool: toolSchema,
  riskLevel: riskLevelSchema,
  summary: z.string().min(1),
  explanation: z.string().min(1),
  dataUsed: z.array(z.string()).optional(),
  impact: z.object({
    before: z.record(z.string(), z.string()),
    after: z.record(z.string(), z.string()),
  }),
  recommendation: z.object({
    label: z.string().min(1),
    message: z.string().min(1),
    confidence: z.number().min(0).max(1).optional(),
  }),
  timestamp: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "timestamp must be a parseable date string",
  }),
})

export type Approval = z.infer<typeof approvalSchema>

export type ApprovalTool = z.infer<typeof toolSchema>

export type ApprovalRiskLevel = z.infer<typeof riskLevelSchema>

const rawMockApprovals = [
  {
    id: "apr_fin_wire_001",
    title: "Wire $24,500 to vendor “Summit Supplies LLC”",
    actionType: "Outbound bank transfer",
    tool: "finance" as const,
    riskLevel: "high" as const,
    summary:
      "Initiates an ACH wire from the operating account to a saved payee.",
    explanation:
      "If approved, Town will send funds from your primary operating account to Summit Supplies LLC using the stored routing and account details. This cannot be automatically reversed once the batch settles.",
    dataUsed: [
      "Operating account ****4401",
      "Payee: Summit Supplies LLC",
      "Invoice #INV-9182",
    ],
    impact: {
      before: {
        "Operating balance": "$182,400.00",
        "Pending outflows": "$0.00",
      },
      after: {
        "Operating balance": "$157,900.00",
        "Pending outflows": "$24,500.00 (processing)",
      },
    },
    recommendation: {
      label: "Review carefully",
      message:
        "Confirm the invoice amount and payee with finance before approving a high-value transfer.",
      confidence: 0.72,
    },
    timestamp: "2026-04-15T09:12:00.000Z",
  },
  {
    id: "apr_email_client_002",
    title: "Send email to client: “Q2 estimate attached”",
    actionType: "Send email",
    tool: "email" as const,
    riskLevel: "medium" as const,
    summary: "Sends a templated message with a PDF attachment to a client.",
    explanation:
      "Approving sends one email from your connected inbox to contact@acmecorp.example with subject “Q2 estimate attached” and attaches estimate-q2.pdf from the documents folder.",
    dataUsed: ["Contact: Acme Corp", "Attachment: estimate-q2.pdf"],
    impact: {
      before: {
        "Client-visible": "No message sent",
        Thread: "—",
      },
      after: {
        "Client-visible": "Email in their inbox",
        Thread: "New outbound message logged",
      },
    },
    recommendation: {
      label: "Quick scan",
      message:
        "Skim the attachment and recipient—external email is hard to unsend.",
    },
    timestamp: "2026-04-15T10:05:30.000Z",
  },
  {
    id: "apr_cal_focus_003",
    title: "Block 2 hours: “Deep work — no meetings”",
    actionType: "Create calendar hold",
    tool: "calendar" as const,
    riskLevel: "low" as const,
    summary: "Creates a personal focus block on your primary calendar.",
    explanation:
      "Creates a busy event tomorrow 1:00–3:00 PM on your primary calendar so assistants and scheduling tools avoid booking over it.",
    impact: {
      before: {
        "Tomorrow 1–3 PM": "Free / bookable",
        Visibility: "Default",
      },
      after: {
        "Tomorrow 1–3 PM": "Busy (focus)",
        Visibility: "Default",
      },
    },
    recommendation: {
      label: "Safe to approve",
      message: "Low impact; only affects your calendar availability.",
      confidence: 0.91,
    },
    timestamp: "2026-04-15T11:40:00.000Z",
  },
  {
    id: "apr_doc_irs_004",
    title: "Submit signed Form 8879 to e-file provider",
    actionType: "Transmit document",
    tool: "documents" as const,
    riskLevel: "high" as const,
    summary: "Uploads a signed IRS e-file authorization to the filing gateway.",
    explanation:
      "Uploads the signed Form 8879 PDF to the connected e-file provider and associates it with return ID 2025-FL-0091. This step is required to release e-filing, but it is irreversible for that return season.",
    dataUsed: ["Return: 2025-FL-0091", "Document: Form 8879 signed PDF"],
    impact: {
      before: {
        "Filing status": "Held — authorization missing",
        "Provider lock": "Open for edits",
      },
      after: {
        "Filing status": "Ready to transmit (authorization on file)",
        "Provider lock": "Authorization locked for this return",
      },
    },
    recommendation: {
      label: "Confirm identity and return",
      message:
        "Verify the correct taxpayer, tax year, and signature before releasing filing authorization.",
      confidence: 0.68,
    },
    timestamp: "2026-04-14T16:00:00.000Z",
  },
  {
    id: "apr_other_rename_005",
    title: "Rename 14 exported files with date prefix",
    actionType: "Bulk file rename",
    tool: "other" as const,
    riskLevel: "low" as const,
    summary: "Applies a consistent yyyy-mm-dd prefix inside an export folder.",
    explanation:
      "Runs a one-time rename script in /Exports/March so files sort chronologically in file browsers and downstream tools.",
    impact: {
      before: {
        "Sample name": "report-sales.csv",
        Count: "14 files",
      },
      after: {
        "Sample name": "2026-03-31-report-sales.csv",
        Count: "14 files renamed",
      },
    },
    recommendation: {
      label: "Low risk",
      message: "Reversible via version history if the folder is backed up.",
    },
    timestamp: "2026-04-13T08:45:00.000Z",
  },
] as const

export const MOCK_APPROVALS: Approval[] = z
  .array(approvalSchema)
  .parse([...rawMockApprovals])

export function getMockApprovalById(id: string): Approval | undefined {
  return MOCK_APPROVALS.find((a) => a.id === id)
}
