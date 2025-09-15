import userEvent from "@testing-library/user-event";
import {
  NewBlogForm,
  authorPlaceholder,
  titlePlaceholder,
  urlPlaceholder,
} from "./NewBlogForm";
import { act, render, screen } from "@testing-library/react";

const testTitle = "Component testing is done with react-testing-library";
const testAuthor = "Barnarne";
const testUrl = "https://fresh.fruits.com";

describe("NewBlogForm", () => {
  let storeBlog;
  let container;

  beforeEach(() => {
    storeBlog = vi.fn();
    container = render(<NewBlogForm storeBlog={storeBlog} />).container;
  });

  test("stores blog with valid data", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText(titlePlaceholder);
    const authorInput = screen.getByPlaceholderText(authorPlaceholder);
    const urlInput = screen.getByPlaceholderText(urlPlaceholder);
    const sendButton = screen.getByText("save");

    assert.isNotNull(titleInput);
    await act(async () => {
      await user.type(titleInput, testTitle);
      await user.type(authorInput, testAuthor);
      await user.type(urlInput, testUrl);
      await user.click(sendButton);
    });

    expect(storeBlog.mock.calls).toHaveLength(1);
    expect(storeBlog.mock.calls[0][0].title).toBe(testTitle);
    expect(storeBlog.mock.calls[0][0].author).toBe(testAuthor);
    expect(storeBlog.mock.calls[0][0].url).toBe(testUrl);
  });
});
