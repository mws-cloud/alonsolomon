import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, MessageCircle, RefreshCw, Trash2, LogOut, Search } from "lucide-react";

type LeadStatus = "new" | "called" | "in_progress" | "irrelevant" | "reminder";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  form_type: string;
  status: LeadStatus;
  call_attempts: number;
  reminder_at: string | null;
  last_action_at: string | null;
  notes: string | null;
  created_at: string;
  proceedings_started: boolean | null;
  is_represented: boolean | null;
  client_note: string | null;
}

const statusLabels: Record<LeadStatus, string> = {
  new: "חדש",
  called: "בוצע חיוג",
  in_progress: "בתהליך",
  irrelevant: "לא רלוונטי",
  reminder: "תזכורת",
};

const statusColors: Record<LeadStatus, string> = {
  new: "bg-[#C89A3D] text-[#1E355E]",
  called: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-900",
  irrelevant: "bg-gray-200 text-gray-600",
  reminder: "bg-purple-100 text-purple-800",
};

const formTypeLabels: Record<string, string> = {
  contact: "טופס יצירת קשר",
  footer: "פוטר",
};

const fmtDate = (s: string | null) => {
  if (!s) return "—";
  return new Date(s).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });
};

const calcLeadScore = (proceedings: boolean | null, represented: boolean | null) => {
  let score = 0;
  if (proceedings === true) score += 2;
  if (represented === true) score -= 2;
  else if (represented === false) score += 1;
  if (proceedings === true && represented === false) score += 1;
  return score;
};

const scoreBadge = (score: number) => {
  if (score >= 3) return { cls: "bg-red-100 text-red-700 border-red-300" };
  if (score >= 1) return { cls: "bg-orange-100 text-orange-700 border-orange-300" };
  if (score === 0) return { cls: "bg-yellow-100 text-yellow-800 border-yellow-300" };
  return { cls: "bg-gray-100 text-gray-600 border-gray-300" };
};

const normalizePhoneIL = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return "972" + digits.slice(1);
  return digits;
};

const waUrl = (name: string, phone: string) => {
  const first = (name || "").trim().split(/\s+/)[0] || "";
  const msg = `שלום ${first}, נעים מאוד אני עורך הדין אלון סולומון, קיבלתי את הפניה שלך, אשמח לקבל ממך קצת יותר פרטים`;
  return `https://wa.me/${normalizePhoneIL(phone)}?text=${encodeURIComponent(msg)}`;
};

const AdminLeads = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem("admin_pwd") || "");
  const [authed, setAuthed] = useState(false);
  const [pwdInput, setPwdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const callApi = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-leads", {
      body: { password, ...body },
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await callApi({ action: "list" });
      setLeads(data.leads || []);
      setAuthed(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "טעינה נכשלה");
      setAuthed(false);
      sessionStorage.removeItem("admin_pwd");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-leads", {
        body: { password: pwdInput, action: "list" },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setPassword(pwdInput);
      sessionStorage.setItem("admin_pwd", pwdInput);
      setLeads(data.leads || []);
      setAuthed(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "סיסמה שגויה");
      sessionStorage.removeItem("admin_pwd");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_pwd");
    setPassword("");
    setAuthed(false);
    setLeads([]);
    setPwdInput("");
  };

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    try {
      const data = await callApi({ action: "update", id, ...patch });
      setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
      toast.success("עודכן");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "עדכון נכשל");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("למחוק את הליד הזה?")) return;
    try {
      await callApi({ action: "delete", id });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("נמחק");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "מחיקה נכשלה");
    }
  };

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-4" dir="rtl">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm border border-[#C89A3D]/20"
        >
          <h1 className="font-heading text-2xl text-[#1E355E] mb-2 text-center">פאנל ניהול לידים</h1>
          <p className="text-sm text-[#667085] mb-6 text-center">יש להזין סיסמת מנהל</p>
          <Input
            type="password"
            placeholder="סיסמה"
            value={pwdInput}
            onChange={(e) => setPwdInput(e.target.value)}
            autoFocus
            className="mb-4"
          />
          <Button type="submit" disabled={loading || !pwdInput} className="w-full bg-[#1E355E] hover:bg-[#142744] text-white">
            {loading ? "מתחבר..." : "כניסה"}
          </Button>
        </form>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!l.name.toLowerCase().includes(q) && !l.phone.includes(q) && !(l.email || "").toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F7F4EE] p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl text-[#1E355E]">ניהול לידים</h1>
            <p className="text-sm text-[#667085]">סה״כ {leads.length} לידים</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadLeads} variant="outline" disabled={loading}>
              <RefreshCw className={`h-4 w-4 ml-1 ${loading ? "animate-spin" : ""}`} /> רענן
            </Button>
            <Button onClick={logout} variant="outline">
              <LogOut className="h-4 w-4 ml-1" /> יציאה
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(["new", "called", "in_progress", "reminder", "irrelevant"] as LeadStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className={`p-3 rounded-lg border text-right transition-all ${
                filterStatus === s
                  ? "border-[#C89A3D] bg-white shadow"
                  : "border-transparent bg-white/60 hover:bg-white"
              }`}
            >
              <div className="text-xs text-[#667085]">{statusLabels[s]}</div>
              <div className="text-2xl font-bold text-[#1E355E]">{counts[s] || 0}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <Input
              placeholder="חיפוש לפי שם / טלפון / אימייל"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסטטוסים</SelectItem>
              {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Leads list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center text-[#667085]">אין לידים להצגה</div>
          )}
          {filtered.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg border border-[#e5e0d6] p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-heading text-xl text-[#1E355E]">{lead.name}</h3>
                    {(() => {
                      const s = calcLeadScore(lead.proceedings_started, lead.is_represented);
                      const b = scoreBadge(s);
                      return (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${b.cls}`}>
                          ציון: {s > 0 ? `+${s}` : s}
                        </span>
                      );
                    })()}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                    <span className="text-xs text-[#667085]">
                      {formTypeLabels[lead.form_type] || lead.form_type}
                    </span>
                  </div>
                  <div className="text-sm text-[#667085]">
                    התקבל: {fmtDate(lead.created_at)}
                    {lead.last_action_at && ` · פעולה אחרונה: ${fmtDate(lead.last_action_at)}`}
                    {lead.call_attempts > 0 && ` · ${lead.call_attempts} ניסיונות חיוג`}
                    {lead.reminder_at && ` · תזכורת: ${fmtDate(lead.reminder_at)}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1 bg-[#C89A3D] hover:bg-[#B8872E] text-[#1E355E] px-3 py-1.5 rounded text-sm font-semibold"
                  >
                    <Phone className="h-4 w-4" /> חייג
                  </a>
                  <a
                    href={waUrl(lead.name, lead.phone)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#20BA5C] text-white px-3 py-1.5 rounded text-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#667085] text-xs mb-1">טלפון</div>
                  <a href={`tel:${lead.phone}`} className="text-[#1E355E] font-mono">{lead.phone}</a>
                </div>
                {lead.email && (
                  <div>
                    <div className="text-[#667085] text-xs mb-1">אימייל</div>
                    <a href={`mailto:${lead.email}`} className="text-[#1E355E]" dir="ltr">{lead.email}</a>
                  </div>
                )}
                {lead.message && (
                  <div className="md:col-span-2">
                    <div className="text-[#667085] text-xs mb-1">הודעה</div>
                    <div className="whitespace-pre-wrap text-[#1F2937]">{lead.message}</div>
                  </div>
                )}
                <div>
                  <div className="text-[#667085] text-xs mb-1">נפתחו הליכים</div>
                  <div className="text-[#1F2937]">
                    {lead.proceedings_started === true ? "כן" : lead.proceedings_started === false ? "לא" : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[#667085] text-xs mb-1">מיוצג ע״י עו״ד</div>
                  <div className="text-[#1F2937]">
                    {lead.is_represented === true ? "כן" : lead.is_represented === false ? "לא" : "—"}
                  </div>
                </div>
                {lead.client_note && (
                  <div className="md:col-span-2">
                    <div className="text-[#667085] text-xs mb-1">הערה מהפונה</div>
                    <div className="whitespace-pre-wrap text-[#1F2937]">{lead.client_note}</div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-[#f0ebe0] grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-3 items-end">
                <div>
                  <label className="text-xs text-[#667085] block mb-1">שינוי סטטוס</label>
                  <Select value={lead.status} onValueChange={(v) => updateLead(lead.id, { status: v as LeadStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-[#667085] block mb-1">הערות פנימיות</label>
                  <Textarea
                    defaultValue={lead.notes || ""}
                    onBlur={(e) => {
                      if (e.target.value !== (lead.notes || "")) {
                        updateLead(lead.id, { notes: e.target.value });
                      }
                    }}
                    rows={2}
                    placeholder="הערות..."
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteLead(lead.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 ml-1" /> מחק
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
